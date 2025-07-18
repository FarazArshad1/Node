import express from "express";
import { body, validationResult } from "express-validator";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var validationRegistration = [
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    // Custom Validation method, where name 'admin' is not allowed
    .custom(value =>{
      if (value === 'admin'){
        throw new Error("Username 'admin' is not allowed")
      }
      return true
    })
    .customSanitizer(value =>{
      value.toLowerCase()
    }),
  body("useremail").isEmail().withMessage("Not a valid Email").normalizeEmail(),
  body("userpass")
    .isLength({ min: 5, max: 15 })
    .withMessage("Pass must be between 5-15 characters long.")
    .isStrongPassword()
    .withMessage("Password must be strong"),
  body("userage")
    .isNumeric()
    .withMessage("Age must be Numeric")
    .isInt({ min: 18 })
    .withMessage("Age Must be at least 18 years old"),
];

app.get("/myform", (req, res) => {
  console.log("Load Form");
  res.render("myform");
});

app.post("/saveform", validationRegistration, (req, res) => {
  const error = validationResult(req);
  res.send(error)
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
