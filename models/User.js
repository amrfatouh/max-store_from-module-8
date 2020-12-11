const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(name, email, cart, _id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }

  addToCart(product) {
    let cartProductIndex;
    if (this.cart.items.length > 0) {
      cartProductIndex = this.cart.items.findIndex(
        (ci) => ci.productId.toString() === product._id.toString()
      );
    }

    if (!cartProductIndex || cartProductIndex < 0) {
      this.cart.items.push({ productId: product._id, quantity: 1 });
    } else {
      this.cart.items[cartProductIndex].quantity += 1;
    }
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: this.cart } })
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  getCart() {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: { $in: this.cart.items.map((i) => i.productId) } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find(
              (i) => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  deleteItemFromCart(productId) {
    this.cart.items = this.cart.items.filter(
      (i) => i.productId.toString() !== productId
    );
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: this.cart } })
      .catch((err) => console.log(err));
  }

  addOrder() {
    this.getCart().then((products) => {
      let order = { items: products, user: { _id: this._id } };
      const db = getDb();
      return db
        .collection("orders")
        .insertOne(order)
        .then(() => {
          this.cart = [];
          db.collection("users")
            .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } })
            .catch((err) => console.log(err));
        });
    });
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({ "user._id": this._id }).toArray();
  }

  save() {
    const db = getDb();
    db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: mongodb.ObjectId(userId) })
      .then((user) => user)
      .catch((err) => console.log(err));
  }
}

module.exports = User;
