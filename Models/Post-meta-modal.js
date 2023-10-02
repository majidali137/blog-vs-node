const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post_MetaScheme = new Schema({
    key:{
        type: String,
        required:true
    },
    content_text:{
        type: String,
        required:true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    }

})
const Post_Meta = mongoose.model("post_meta", Post_MetaScheme)
module.exports = Post_Meta