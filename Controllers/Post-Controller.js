const createError = require("http-errors");
const mongoose = require("mongoose");

const Post = require("../Models/Post-modal");
const User = require("../Models/User-modals");
const Comment = require("../Models/Comment-modal");
const Post_Tag = require("../Models/Post-tag-modal");
const Post_Meta = require("../Models/Post-meta-modal")
const Post_Categoery = require("../Models/Post-categoery-modal")

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const results = await Post.find({}, { __v: 0 });
      // const results = await Post.find({}, {name:1, price:1, _id:0});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  findPostById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      //const post = await post.findById({_id:id});
      if (!post) {
        throw createError(404, " post does not exist");
      }
      res.send(post);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid porduct id "));
        return;
      }
      next(error);
    }
  },

  createNewPost: async (req, res, next) => {
    try {
      const post = new Post(req.body);
      const result = await post.save();
      res.send(result);
    } catch (error) {
      if (error.name === "validationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  updateAPost: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      const result = await Post.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, " post does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid porduct id "));
        return;
      }
      next(error);
    }
  },
  deleteAPost: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, " post does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid porduct id "));
        return;
      }
      next(error);
    }
  },

  // Comments
  createNewPostComment: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const post = await Post.findOne({ _id: req.params.postId });

      const comment = new Comment();

      (comment.title = req.body.title),
        (comment.content = req.body.content),
        (comment.create_date = req.body.create_date);
      comment.user = user._id;
      comment.post = post._id;

      await comment.save();

      post.comments.push(comment._id);

      await post.save();

      res.send(comment);
    } catch (error) {
      console.log(error.message);
    }
  },

  // Get Comments
  getCommentsWithUserIdAndPostId: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }, { __v: 0 });
      const post = await Post.findOne({ _id: req.params.postId }, { __v: 0 });
      if (!user) {
        throw createError(404, " user does not exist");
      }

      res.send(user + post);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  // create post tags
  createPostTags: async (req, res, next) => {
    try {
      // Find a post
      const post = await Post.findOne({ _id: req.params.postId });
      // create a post
      const post_tag = new Post_Tag(req.bod);
      (post_tag.title = req.body.title),
        (post_tag.meta_title = req.body.meta_title),
        (post_tag.slug = req.body.slug),
        (post_tag.content_text = req.body.content_text);
        post_tag.post = post._id;
      if (!post) {
        throw createError(404, " post does not exist");
      }
      await post_tag.save();
      // Associate user with post
      post.tags.push(post_tag._id);
      await post.save();

      res.send(post_tag);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid post id "));
        return;
      }
      next(error);
    }
  },
  findTagsWithPost: async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId },{__v:0});
      if (!post) {
        throw createError(404, " post does not exist");
      }
      res.send(post);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  // post meta 
  createPostMeta:async (req, res, next) => {
    try {
      // Find a post
      const post = await Post.findOne({ _id: req.params.postId });
      // create a post
      const post_meta = new Post_Meta(req.bod);
      (post_meta.key = req.body.key),
        (post_meta.content_text = req.body.content_text);
        post_meta.post = post._id;
      if (!post) {
        throw createError(404, " post does not exist");
      }
      await post_meta.save();
      // Associate user with post
      post.post_meta.push(post_meta._id);
      await post.save();

      res.send(post_meta);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid post id "));
        return;
      }
      next(error);
    }
  },

  getPostMeta: async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId },{__v:0});
      if (!post) {
        throw createError(404, " post does not exist");
      }
      res.send(post);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  
  // create Post Categoery

  createPostCategoery: async (req, res, next) => {
    try {
      // Find a post
      const post = await Post.findOne({ _id: req.params.postId });
      // create a post
      const post_categoery = new Post_Categoery(req.bod);
      (post_categoery.title = req.body.title),
        (post_categoery.meta_title = req.body.meta_title),
        (post_categoery.slug = req.body.slug),
        (post_categoery.content_text = req.body.content_text);
        post_categoery.post = post._id;
      if (!post) {
        throw createError(404, " post does not exist");
      }
      await post_categoery.save();
      // Associate user with post
      post.post_categoerys.push(post_categoery._id);
      await post.save();

      res.send(post_categoery);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid post id "));
        return;
      }
      next(error);
    }
  },
  // get post categoery
  getPostCategoery: async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId },{__v:0});
      if (!post) {
        throw createError(404, " post does not exist");
      }
      res.send(post);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },
};
