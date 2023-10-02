const express = require("express");
const router = express.Router();

const PostController = require("../Controllers/Post-Controller");

// Get A list of all Post
router.get("/", PostController.getAllPosts);

// Create a new Post
router.post("/", PostController.createNewPost);

// Get single Post by id
router.get("/:id", PostController.findPostById);

// update a Post by id
router.patch("/:id", PostController.updateAPost);

// delete a Post by id
router.delete("/:id", PostController.deleteAPost);

// create comment Route
router.post("/:userId/:postId/comments", PostController.createNewPostComment);

// get comment Route
router.get(
  "/:userId/:postId/comments",
  PostController.getCommentsWithUserIdAndPostId
);

// create post tags route
router.post("/:postId/tags", PostController.createPostTags)

// routes for get post tags
router.get("/:postId/tags", PostController.findTagsWithPost)

// route for post meta
router.post("/:postId/meta", PostController.createPostMeta)

// get post meta
router.get("/:postId/meta", PostController.getPostMeta)

// create post_categoery
router.post("/:postId/post_categoery", PostController.createPostCategoery)

// get post_categoery
router.get("/:postId/post_categoery", PostController.getPostCategoery)

module.exports = router;
