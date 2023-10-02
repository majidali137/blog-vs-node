const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User-Controller");

// Get all user Route
router.get("/", UserController.getAllUser);

// Create user Route
router.post("/", UserController.createNewUser);

// Get single user by id Route
router.get("/:id", UserController.findUserById);

// Update User Route
router.patch("/:id", UserController.updateUser);

// Delete User

router.delete("/:id", UserController.deleteUser);

// Create user product with userid
router.post("/:userId/posts", UserController.createNewUserPost);

// Get User with Product id Route
router.get("/:userId/posts", UserController.findUserwithPost);

module.exports = router;
