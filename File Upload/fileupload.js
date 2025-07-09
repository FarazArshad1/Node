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
  res.send(req.file.filename);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
