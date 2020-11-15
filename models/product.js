const fs = require("fs");
const path = require("path");

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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (this.id) {
      getProductsFromFile((products) => {
        let thisProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        products[thisProductIndex] = this;

        //rewrite the products array into the file
        fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
      });
    } else {
      this.id = Math.random().toString();
      getProductsFromFile((products) => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      });
    }
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getProductById(id, cb) {
    this.fetchAll((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }
};
