const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post_CategoeryScheme = new Schema({
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
const Post_Categoery= mongoose.model("post_categoery", Post_CategoeryScheme)
module.exports = Post_Categoery