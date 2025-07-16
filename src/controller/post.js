import mongoose from "mongoose";
import { postSchema } from "../Schema/post";
import { Post } from "../model/post";

export const getPosts = async (req, res) => {
  try {
    const data = await Post.find().populate("category_id").populate("tags");;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const createPosts = async (req, res) => {
  try {
    const { name, tags } = req.body;
    const { error } = postSchema.validate(req.body, {
      abortEarly: false,
    });
    console.log(req.body);
    if (error) {
      //   const list = error.details.map((issue) => ({
      //     message: issue.message,
      //   }));
      return res.status(500).json(error);
    }
    const checkname = await Post.findOne({ name });
    if (checkname) {
      return res.status(500).json({
        message: "Đã có tên này",
      });
    }
    const invalidTags = tags.filter(
      (tag) => !mongoose.Types.ObjectId.isValid(tag)
    );

    if (invalidTags.length > 0) {
      return res.status(400).json({
        message: `Các tag không hợp lệ`,
      });
    }
    const data = await Post(req.body).save();
    return res.status(201).json({
      message: "Thêm thành công ",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updatePosts = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const { error } = postSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const list = error.details.map((issue) => ({
        message: issue.message,
      }));
      return res.status(500).json(list);
    }
    const checkname = await Post.findOne({ name });
    if (checkname && checkname._id.toString() !== id) {
      return res.status(500).json({
        message: "Đã có tên này",
      });
    }
    const data = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json({
      message: "Thêm thành công ",
      data,
    });
  } catch (error) {
    return req.status(500).json({ message: error.message });
  }
};
export const detailPost = async (req, res) => {
  try {
    const data = await Post.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Xóa thành công ",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
