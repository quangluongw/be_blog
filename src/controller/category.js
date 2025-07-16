import { categorySchema } from "../Schema/category";
import { Category } from "../model/category";

export const GetCategory = async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const list = error.details.map((issue) => ({
        message: issue.message,
      }));
      return res.status(500).json(list);
    }
    const checkname = await Category.findOne({ name });
    if (checkname) {
      return res.status(500).json({
        message: "Đã có tên này",
      });
    }
    const data = await Category(req.body).save();
    return res.status(201).json({
      message: "Thêm thành công ",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const DeleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Xóa thành công ",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const UpdateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const list = error.details.map((issue) => ({
        message: issue.message,
      }));
      return res.status(500).json(list);
    }
    const checkname = await Category.findOne({ name });
    if (checkname) {
      return res.status(500).json({
        message: "Đã có tên này",
      });
    }
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
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
export const DetailCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);

    if (!data) {
      return res.status(200).json([]);
    }

    // Tìm thấy -> trả về dữ liệu
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
