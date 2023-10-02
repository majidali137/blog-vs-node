const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  register_Date: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: "Post is required Field",
    },
  ],
});
const User = mongoose.model("user", UserScheme);
module.exports = User;
