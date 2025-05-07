import mongoose from "mongoose";
const { Schema } = mongoose;


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,

    },
    image:{
       url: String,
       filename: String,
       
    },
    location:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    review:[
        {
            type: Schema.Types.ObjectId, ref: "Review",
        }
    ]


}, {timestamps : true})

const Post = mongoose.model("Post", postSchema)

export default Post;