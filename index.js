require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectare MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectat la MongoDB"))
  .catch(err => console.error(err));


// Import rute
const todoRoutes = require("./routes/todos");
app.use("/todos", todoRoutes);

// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server pornit pe http://localhost:${PORT}`);
});
