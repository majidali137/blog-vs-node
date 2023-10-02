const express = require("express");
const router = express.Router();

const CommentController = require("../Controllers/Comment-Controller");

// Get A list of all Comment
router.get("/", CommentController.getAllComments);

// Create a new Comment
router.post("/", CommentController.createNewComment);

// Get single Comment by id
router.get("/:id", CommentController.findCommentById);

// update a Comment by id
router.patch("/:id", CommentController.updateAComment);

// delete a Comment by id
router.delete("/:id", CommentController.deleteAComment);



module.exports = router;