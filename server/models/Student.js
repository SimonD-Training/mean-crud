const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      cohort: {
         type: String,
         required: true,
      },
      phoneNumber: {
         type: Number,
         required: true,
      },
   },
   { collection: "students" }
);

module.exports = mongoose.model("Students", StudentSchema);
