const Product = require("../models/product");
const User = require("../models/User");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((products) => {
    let totalPrice;
    if (products) {
      totalPrice = products.reduce(
        (p, c) => p + Number(c.price) * c.quantity,
        0
      );
    }
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
      totalPrice: totalPrice,
    });
  });
};

exports.postAddToCart = (req, res, next) => {
  Product.getProductById(req.body.productId).then((product) => {
    req.user.addToCart(product);
  });
  res.redirect("/");
};

exports.postRemoveFromCart = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.productId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    console.log(orders);
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
