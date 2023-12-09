const User = require("../models/userModel");

// Controller for handling user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username, password });

    if (user) {
      // User found, send success response
      res.status(200).json({ message: "Login successful", user });
    } else {
      // User not found, send error response
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Registration successful, send success response
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for updating user information
const updateUser = async (req, res) => {
  const { username, password } = req.body;
  const userId = req.params.id; // assuming you have the user ID in the request parameters

  try {
    // Check if the user exists in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user information
    user.username = username;
    user.password = password;

    // Save the updated user
    await user.save();

    // Send success response
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for deleting a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the database
    await User.deleteOne({ _id: userId });

    // Send success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
};
