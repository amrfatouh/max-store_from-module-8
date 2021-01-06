const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  let cartProductIndex = this.cart.items.findIndex(
    (ci) => ci.productId.toString() === product._id.toString()
  );
  if (cartProductIndex < 0) {
    this.cart.items.push({ productId: product._id, quantity: 1 });
  } else {
    this.cart.items[cartProductIndex].quantity += 1;
  }
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (productId) {
  this.cart.items = this.cart.items.filter(
    (i) => i.productId.toString() !== productId
  );
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
