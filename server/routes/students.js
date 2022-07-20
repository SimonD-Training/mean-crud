const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// Create Student
router.post("/create", async (req, res) => {
   const studentModel = new Student({
      name: req.body.name,
      email: req.body.email,
      cohort: req.body.cohort,
      phoneNumber: req.body.phoneNumber,
   });

   const savedStudent = await studentModel.save();
   res.json(savedStudent);
});

// Find All Student
router.get("/", async (req, res) => {
   const student = await Student.find();
   res.json(student);
});

// Find One Student
router.get("/find", async (req, res) => {
   /**
    * Find document via query params `name` or `objectId`
    * Query Strings
    * ?by=name&name=
    * ?by=id&id=
    */

   const getByQuery = req.query.by;
   const searchArray = [req.query.name, req.query.id];
   let students = [];

   // Switch based on the search query passed
   switch (getByQuery) {
      case "name":
         const nameQuery = searchArray[0];
         students = await Student.find({
            $text: { $search: nameQuery, $caseSensitive: false },
         });

         if (!students) res.json({ message: "Student Not Found" });

         res.json(students);
         break;
      case "id":
         const idQuery = searchArray[1];
         students = await Student.findById(idQuery);

         if (students.length < 0) res.json({ message: "Student Not Found" });

         res.json(students);
         break;
      default:
         res.json({ message: "No Students Found..." });
         break;
   }
});

// Update One Student
router.put("/update/:id", async (req, res) => {
   const oldStudent = await Student.findOneAndUpdate(
      { _id: req.params.id },
      req.body
   );
   const updatedStudent = await Student.findOne({ _id: req.params.id });

   if (oldStudent) {
      return res.json({ message: "success", oldStudent, updatedStudent });
   }

   res.json({ message: "No Student Found..." });
});

// Delete One Student
router.delete("/delete/:id", async (req, res) => {
   const deletedStudent = await Student.findOneAndDelete({
      _id: req.params.id,
   });
   if (deletedStudent) {
      return res.json({ message: "success", deletedStudent });
   }

   res.json({ message: "No Student Found..." });
});

module.exports = router;
