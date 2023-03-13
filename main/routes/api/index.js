// Require Express Router module
const router = require("express").Router();

// Import user and thought routes
const usersRoutes = require("./userRoutes");
const thoughtsRoutes = require("./thoughtRoutes");

// register routes for /user
router.use("/users", usersRoutes);

// register routes for /thoughts
router.use("/thoughts", thoughtsRoutes);

// Export the router module
module.exports = router;
