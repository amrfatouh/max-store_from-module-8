const Product = require("../models/product");
const User = require("../models/User");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      isAuthenticated: req.session.isLoggedIn,
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
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      let totalPrice;
      let products = user.cart.items;
      if (products) {
        totalPrice = products.reduce(
          (p, c) => p + Number(c.productId.price) * c.quantity,
          0
        );
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        totalPrice: totalPrice,
        isAuthenticated: req.session.isLoggedIn,
      });
    });
};

exports.postAddToCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      req.user.addToCart(product);
    })
    .then(() => res.redirect("/"));
};

exports.postRemoveFromCart = (req, res, next) => {
  req.user
    .deleteItemFromCart(req.body.productId)
    .then(() => res.redirect("/cart"));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    console.log(orders);
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    isAuthenticated: req.session.isLoggedIn,
  });
};
