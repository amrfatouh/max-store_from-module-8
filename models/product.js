const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Product",
  mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  })
);

// const { getDb } = require("../util/database");
// const mongodb = require("mongodb");

// module.exports = class Product {
//   constructor(title, imageUrl, description, price, id, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.id = id ? mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     if (this.id) {
//       return db
//         .collection("products")
//         .updateOne({ _id: this.id }, { $set: this })
//         .then((result) => console.log(result))
//         .catch((err) => console.log(err));
//     } else {
//       return db
//         .collection("products")
//         .insertOne(this)
//         .then((result) => {
//           console.log(result.ops);
//         })
//         .catch((err) => console.log(err));
//     }
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       });
//   }

//   static getProductById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: mongodb.ObjectId(id) })
//       .next()
//       .then((product) => product)
//       .catch((err) => console.log(err));
//   }

//   static deleteProduct(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: mongodb.ObjectId(id) })
//       .then(() => console.log("object deleted successfully"))
//       .catch((err) => console.log(err));
//   }
// };
