import express from "express";
import session from "express-session";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "./model/user.model.js";

const app = express();

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1/user-crud")
  .then(() => console.log("Connected"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(
  session({
    secret: "dhjsdq73q98e8d3dn7334297fhw87h7w921983hfeudjs",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes

let checklogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/",checklogin, (req, res) => {
  res.render('home');
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { username, userpassword } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", { error: "User not found" });
  }
  const isMatch = await bcrypt.compare(userpassword, user.userpassword);

  if (!isMatch) {
    return res.render("login", { error: "Incorrect Email or Password" });
  } else {
    req.session.user = username;
    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, userpassword } = req.body;
  const hashedPassword = await bcrypt.hash(userpassword, 10);

  // create user in database

  await User.create({ username: username, userpassword: hashedPassword });
  res.redirect("/login");
});

app.get("/get-users", async (req, res) => {
  const results = await User.find();
  res.send(results);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
