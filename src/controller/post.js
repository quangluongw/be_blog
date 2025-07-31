import mongoose from "mongoose";
import { postSchema } from "../Schema/post";
import { Post } from "../model/post";
import { Category } from "../model/category";
import { Tag } from "../model/tag";



export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { category_name, tag_names } = req.query;
    const filter = {};

    // Lọc theo tên category
    if (category_name) {
      const category = await Category.findOne({ name: category_name });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.category_id = category._id;
    }

    // Lọc theo tên các tag (danh sách cách nhau bởi dấu phẩy)
    if (tag_names) {
      const tagNameArray = Array.isArray(tag_names)
        ? tag_names
        : tag_names.split(",");

      const tags = await Tag.find({ name: { $in: tagNameArray } });

      if (tags.length !== tagNameArray.length) {
        return res.status(404).json({ message: "One or more tags not found" });
      }

      const tagIds = tags.map(tag => tag._id);
      filter.tags = { $all: tagIds }; // Post phải chứa tất cả tag này
    }

    const posts = await Post.find(filter)
      .populate("category_id")
      .populate("tags")
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);

    return res.status(200).json({
      data: posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createPosts = async (req, res) => {
  try {
    const { name, tags } = req.body;
    const { error } = postSchema.validate(req.body, {
      abortEarly: false,
    });
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
    const slug = req.params.slug;
    const data = await Post.findOne({ slug })
      .populate("category_id")
      .populate("tags");

    if (!data) {
      return res.status(404).json({ message: "Post not found" });
    }

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
