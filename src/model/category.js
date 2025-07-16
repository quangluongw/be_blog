import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
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
export const Category = mongoose.model("category", categorySchema);