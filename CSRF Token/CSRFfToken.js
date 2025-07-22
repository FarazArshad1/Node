import express from "express";
import cookieParser from "cookie-parser";
import csurf from "csurf";

const app = express();

// Middlewares

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// Setting up csrf token
const crsfProtection = csurf({ cookie: true });

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/myform", crsfProtection, (req, res) => {
  res.render("myform",{csrfToken : req.csrfToken()});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
