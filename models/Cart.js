const fs = require("fs");
const path = require("path");

const Product = require("./product");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addToCart(id) {
    // fetching the cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) cart = JSON.parse(fileContent);
      Product.getProductById(id, (product) => {
        let existingProduct = cart.products.find((prod) => prod.id === id);
        // check if the product already exists in the cart or not
        if (existingProduct) {
          // the product exists => increase the quantity
          existingProduct.quantity += 1;
        } else {
          // the product doesn't exist => add a new product
          cart.products.push({ id: id, quantity: 1 });
        }
        // increase the total price
        cart.totalPrice += Number(product.price);

        // rewrite the file to save the new cart
        fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
      });
    });
  }

  static removeFromCart(id) {
    fs.readFile(p, (err, fileContent) => {
      let cart;
      if (!err) cart = JSON.parse(fileContent);
      let removedProduct = cart.products.find((prod) => prod.id === id);
      Product.getProductById(id, (product) => {
        //taking out from the total price
        cart.totalPrice -= removedProduct.quantity * product.price;
        //removing the item from the cart
        cart.products = cart.products.filter((prod) => prod.id !== id);

        // rewriting the cart json file
        fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
      });
    });
  }

  static fetchCartData(cb) {
    fs.readFile(p, (err, fileContent) => {
      let cart;
      if (!err) cart = JSON.parse(fileContent);
      else cart = { products: [], totalPrice: 0 };
      cb(cart.products, cart.totalPrice);
    });
  }
};
