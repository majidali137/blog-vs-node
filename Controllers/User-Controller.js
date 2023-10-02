const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User-modals");
const Post = require("../Models/Post-modal");

module.exports = {
  // Get All users
  getAllUser: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      // const results = await User.find({}, {name:1, price:1, _id:0});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  // Get Single user find by id
  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      //const post = await post.findById({_id:id});
      if (!user) {
        throw createError(404, " user does not exist");
      }
      res.send(user);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  // Create a new user
  createNewUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (error) {
      if (error.name === "validationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  // Update User
  updateUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      const result = await User.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, "user does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      console.log(result);
      if (!result) {
        throw createError(404, " user does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  // Create user post with userid
  createNewUserPost: async (req, res, next) => {
    try {
      // Find a post
      const user = await User.findOne({ _id: req.params.userId });
      // create a post
      const post = new Post(req.bod);
      (post.title = req.body.title),
        (post.meta_title = req.body.meta_title),
        (post.slug = req.body.slug),
        (post.summary = req.body.summary),
        (post.content = req.body.content);
      post.user = user._id;
      if (!user) {
        throw createError(404, " user does not exist");
      }
      await post.save();
      // Associate user with post
      user.posts.push(post._id);
      await user.save();

      res.send(post);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },

  // find post with userid
  findUserwithPost: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }, { __v: 0 });
      if (!user) {
        throw createError(404, " post does not exist");
      }
      res.send(user);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid user id "));
        return;
      }
      next(error);
    }
  },
};
