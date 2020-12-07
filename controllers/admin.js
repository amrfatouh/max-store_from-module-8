const Cart = require("../models/Cart");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEdit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    imageUrl,
    description,
    price,
    null,
    req.user._id
  );
  product.save();
  res.redirect("/");
};

exports.getEditProducts = (req, res, next) => {
  const isEdit = req.query.edit === "true";
  const productId = req.query.productId;
  Product.getProductById(productId)
    .then((product) => {
      res.render("../views/admin/edit-product.ejs", {
        pageTitle: `Edit "${product.title}"`,
        path: "/admin/edit-products",
        isEdit,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  new Product(title, imageUrl, description, price, productId).save();
  Cart.updateTotalPrice();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteProduct(req.body.productId);
  res.redirect("/admin/products");
};
