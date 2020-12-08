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
    const cartProductIndex = this.cart.items.findIndex(
      (ci) => ci.productId.toString() === product._id.toString()
    );
    if (cartProductIndex >= 0) {
      this.cart.items[cartProductIndex].quantity += 1;
    } else {
      this.cart.items.push({ productId: product._id, quantity: 1 });
    }
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: this.cart } })
      .then((result) => result)
      .catch((err) => console.log(err));
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
