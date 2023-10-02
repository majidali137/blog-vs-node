const createError = require("http-errors");
const mongoose = require("mongoose");


const Comment = require("../Models/Comment-modal");

module.exports = {
  getAllComments: async (req, res, next) => {
    try {
      const results = await Comment.find({}, { __v: 0 });
      // const results = await Comment.find({}, {name:1, price:1, _id:0});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  findCommentById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const comment = await Comment.findById(id);
      //const comment = await Comment.findById({_id:id});
      if (!comment) {
        throw createError(404, " comment does not exist");
      }
      res.send(comment);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "InValid porduct id "));
        return;
      }
      next(error);
    }
  },

  createNewComment: async (req, res, next) => {
    try {
      const comment = new Comment(req.body);
      const result = await comment.save();
      res.send(result);
    } catch (error) {
      if (error.name === "validationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  updateAComment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      const result = await Comment.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, " comment does not exist");
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
  deleteAComment: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Comment.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, " comment does not exist");
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

};
