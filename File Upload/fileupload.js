import express from "express";
import multer from "multer";
import path from "path";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

// if(file.mimetype.startsWith('image/'))  Accepts only image type
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.render("myform");
});

app.post("/submitform", upload.single("userfile"), (req, res) => {
  if (!req.files || req.file.length == 0) {
    return res.status(400).send(`No files uploaded.`);
  }
  res.send(req.file.filename);
});

const multerErrorHandling = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).send(`Multer Error: ${error.message}`);
  } else if (error) {
    return res.status(500).send(`Something Went Wrong : ${error.message0}`);
  }
  next();
};

app.use(multerErrorHandling);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
