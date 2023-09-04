const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");

// Create a new user
router.post("/create", userController.createUser);

// Retrieve all users
router.get("/getAll", userController.getAllUsers);

// Retrieve a user by ID
router.get("/get/:id", userController.getUserById);

// Update a user by ID
router.put("/update/:id", userController.updateUserById);

// Delete a user by ID
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;
