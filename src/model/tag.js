import mongoose from "mongoose";

const tagSchema=new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique: true,
        minlength: 3,
    },
    slug:{
        type:String,
        required:true
    }
})
export const Tag = mongoose.model("tag", tagSchema);