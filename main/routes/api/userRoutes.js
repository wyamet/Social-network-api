// Require the express router module
const router = require("express").Router();

// Import the required functions from the users-controller module
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/UserController");

// Set up routes for GET and POST requests to "/api/users"
router.route("/").get(getAllUsers).post(createUser);

// Set up routes for GET, PUT, and DELETE requests to "/api/users/:id"
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

// Set up routes for POST and DELETE requests to "/api/users/:id/friends/:friendId"
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router module
module.exports = router;
