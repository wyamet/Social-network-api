// Require Express Router module
const router = require("express").Router();

// Import api Routes
const apiRoutes = require("./api");

// register any routes that start with /api
router.use("/api", apiRoutes);

// error message
router.use((req, res) => {
  res.status(404).send("<h1>404 Error....</h1>");
});

// Module exports router
module.exports = router;
