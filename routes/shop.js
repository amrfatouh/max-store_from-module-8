const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");
const verifyUser = require("../middlewares/auth").verifyUser;

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", verifyUser, shopController.getCart);

router.post("/add-to-cart", shopController.postAddToCart);

router.post("/remove-from-cart", shopController.postRemoveFromCart);

// router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
