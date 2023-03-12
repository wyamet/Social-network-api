// Require the express router module
const router = require("express").Router();

// Import the required functions from the users-controller module
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");

// Set up routes for GET and POST requests to "/api/users"
router.route("/").get(getAllUsers).post(createUsers);

// Set up routes for GET, PUT, and DELETE requests to "/api/users/:id"
router.route("/:id").get(getUsersById).put(updateUsers).delete(deleteUsers);

// Set up routes for POST and DELETE requests to "/api/users/:id/friends/:friendId"
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router module
module.exports = router;
