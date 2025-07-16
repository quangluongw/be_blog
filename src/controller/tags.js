import { tagSchema } from "../Schema/tag";
import { Tag } from "../model/tag";

export const GetTag = async (req, res) => {
  try {
    const data = await Tag.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const CreateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = tagSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const list = error.details.map((issue) => ({
        message: issue.message,
      }));
      return res.status(500).json(list);
    }
    const checkname = await Tag.findOne({ name });
    if (checkname) {
      return res.status(500).json({
        message: "Đã có tên này",
      });
    }
    const data = await Tag(req.body).save();
    return res.status(201).json({
      message: "Thêm thành công ",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const DeleteTag = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Xóa thành công ",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const UpdateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = tagSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const list = error.details.map((issue) => ({
        message: issue.message,
      }));
      return res.status(500).json(list);
    }
    const checkname = await Tag.findOne({ name });
    if (checkname) {
      return res.status(500).json({
        message: "Đã có tên này",
      });
    }
    const data = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Sửa thành công ",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const DetailTag = async (req, res) => {
  try {
    const data = await Tag.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
