const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
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
