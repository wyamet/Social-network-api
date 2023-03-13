const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/api/userRoutes");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // handle JSON data
app.use(express.urlencoded({ extended: true })); // handle urlencoded data

// Database Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/Social-network-api",
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use(require("./routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
