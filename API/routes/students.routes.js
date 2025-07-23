import express from "express";
import Student from "../models/students.model.js";

// create import mymiddleware from "../../middlewares/application.middleware.js";router
const router = express.Router();

const mymiddleware = (req, res, next)=>{
    const date = new Date()
    const timestamp = date.toISOString()
    console.log('\x1b[36m%s\x1b[0m', '----------------------------------------')
    console.log('\x1b[32m%s\x1b[0m', `🕒 ${timestamp}`)
    console.log('\x1b[33m%s\x1b[0m', `📍 ${req.method} ${req.url}`)
    if (['POST', 'PUT'].includes(req.method)) {
        console.log('\x1b[34m%s\x1b[0m', '📦 Request Body:', JSON.stringify(req.body, null, 2))
    }
    console.log('\x1b[36m%s\x1b[0m', '----------------------------------------')
    next()
}

router.use(mymiddleware)

// Get All Students
router.get("/", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).join({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Single Student
router.get("/:id", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new Student
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a Student record
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).join({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).join({ message: "Student not found" });
    }
    res.json("Student Deleted");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;