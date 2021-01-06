const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length === 0) {
    message = null;
  }
  res.render("auth/login.ejs", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isCorrect) => {
        if (isCorrect) {
          req.session.user = user;
          req.session.isLoggedIn = true;
          req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        } else {
          req.flash("error", "wrong email or password");
          res.redirect("/login");
        }
      });
    } else {
      req.flash("error", "wrong email or password");
      res.redirect("/login");
    }
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  let message = req.flash("error");
  if (message.length === 0) {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: "Sign Up",
    path: "/signup",
    errorMessage: message,
  });
};

exports.postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      req.flash("error", "email already used");
      res.redirect("/signup");
    } else {
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          let newUser = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return newUser.save();
        })
        .then((result) => res.redirect("/login"));
    }
  });
};
