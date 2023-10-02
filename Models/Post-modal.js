const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  meta_title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
      required: "comments is required Field",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post_tag",
    },
  ],
  post_meta: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post_meta",
    },
  ],
  post_categoerys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post_categoery",
    },
  ],
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
