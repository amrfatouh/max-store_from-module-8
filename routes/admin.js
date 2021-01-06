const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const verifyUser = require("../middlewares/auth").verifyUser;

const router = express.Router();

router.get("/products", verifyUser, adminController.getProducts);

router.get("/add-product", verifyUser, adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product", verifyUser, adminController.getEditProducts);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
