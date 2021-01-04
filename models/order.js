const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Order",
  mongoose.Schema({
    products: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    user: {
      name: { type: String, required: true },
      userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
      ref: "User",
    },
  })
);
