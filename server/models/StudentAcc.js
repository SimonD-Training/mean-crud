const mongoose = require("mongoose");

const StudentAccSchema = new mongoose.Schema(
   {
      bank: {
         type: String,
         required: true,
      },
      branch: {
         type: String,
         required: true,
      },
      account_num: {
         type: String,
         required: true,
      },
      account_type: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         required: true,
      },
      student_id: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: "Students"
      },
   },
   { collection: "student_accs" }
);

module.exports = mongoose.model("Student_Accs", StudentAccSchema);