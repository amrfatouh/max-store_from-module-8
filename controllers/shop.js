const Cart = require("../models/Cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCartProducts((cartProducts) => {
    Product.fetchAll((products) => {
      let sentProducts = [];
      cartProducts.forEach((cProd) => {
        let sentProd = products.find((p) => p.id === cProd.id);
        if (sentProd) {
          sentProd.quantity = cProd.quantity;
          sentProducts.push(sentProd);
        }
      });
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: sentProducts,
      });
    });
  });
};

exports.postAddToCart = (req, res, next) => {
  Cart.addToCart(req.body.productId);
  res.redirect("/");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
