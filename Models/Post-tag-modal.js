const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post_TagScheme = new Schema({
    title:{
        type:String,
        required: true
    },
    meta_title:{
        type:String,
        required:true
    },
    slug:{
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
const Post_Tag = mongoose.model("post_tag", Post_TagScheme)
module.exports = Post_Tag