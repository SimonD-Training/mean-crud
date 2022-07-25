const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const StudentAcc = require("../models/StudentAcc");

router.post("/create_acc", (req, res) => {
   let studentAcc = new StudentAcc({
      bank: req.body.bank,
      branch: req.body.branch,
      account_num: req.body.account_num,
      account_type: req.body.account_type,
      status: req.body.status,
      student_id: req.body.student_id,
   });
   if (req.body._id != "") {
      StudentAcc.findById(req.body._id).then((value) => {
         if (value)
            StudentAcc.findByIdAndUpdate(req.body._id, req.body).then(
               (value) => {
                  res.json(value);
               }
            );
         else
            studentAcc.save().then((value) => {
               res.json(value);
            });
      });
   } else {
      studentAcc.save().then((value) => {
         res.json(value);
      });
   }
});

router.get("/:id", (req, res) => {
   let id = req.params.id;
   StudentAcc.findOne({student_id: new mongoose.Types.ObjectId(id)}).then((value) => {
      res.json(value);
   });
});

module.exports = router;
