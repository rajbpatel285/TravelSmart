const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Route for user login
router.post("/login", userController.loginUser);

// Route for user registration
router.post("/register", userController.registerUser);

// Route for updating a user
router.put("/update/:id", userController.updateUser);

// Route for deleting a user
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
