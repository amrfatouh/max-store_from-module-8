const fs = require("fs");
const path = require("path");
const { getDb } = require("../util/database");
const mongodb = require("mongodb");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
      console.log("error loading the file");
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result.ops);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll(cb) {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      });
  }

  static getProductById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: mongodb.ObjectId(id) })
      .next()
      .then((product) => product)
      .catch((err) => console.log(err));
  }
};
