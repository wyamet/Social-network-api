const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController");

// GET all users
router.get("/", userController.getAllUsers);

// GET a specific user
router.get("/:id", userController.getUser);

// POST a new user
router.post("/", userController.createUser);

// PUT/update an existing user
router.put("/:id", userController.updateUser);

// DELETE a user
router.delete("/:id", userController.deleteUser);

module.exports = router;
