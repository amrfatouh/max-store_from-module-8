const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/User");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5fd3bba01e131d4a443132f2")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://amrfatouh:hello123@cluster0.qfft3.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user)
        new User({
          name: "Amr",
          email: "amr@test.com",
          cart: { items: [] },
        }).save();
    });
  })
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
