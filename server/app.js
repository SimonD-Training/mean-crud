require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(["*", "http://localhost:4200"]));

// API Root Route
app.get("/", (req, res) =>
   res.json({ message: "Hello, World! 👋", version: "v0.1.0" })
);

// Routes
app.use("/students", require("./routes/students"));

// Start Express App
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
   if (err) throw err;

   console.log("MongoDB Connected!");

   app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
   });
});
