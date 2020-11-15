const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://amrfatouh:hello123@cluster0.qfft3.mongodb.net/<dbname>?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected successfully");
      _db = client.db();
      callback(client);
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "couldn't find database";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
