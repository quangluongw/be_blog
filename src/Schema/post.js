import Joi from "joi";

export const postSchema = Joi.object({
  name: Joi.string().required().min(3).trim().messages({
    "any.required": "Tên danh mục không được để trống",
    "string.min": "Tên danh mục có ít nhất 3 ký tự",
  }),

  slug: Joi.string().required().min(3).trim().messages({
    "any.required": "Slug không được để trống",
    "string.min": "Slug có ít nhất 3 ký tự",
  }),

  tags: Joi.array().items(Joi.string().trim().min(1)).default([]).messages({
    "array.base": "Tags phải là mảng",
    "string.base": "Mỗi tag phải là chuỗi",
    "string.empty": "Mỗi tag không được để trống",
  }),
  image: Joi.string().required().uri().trim().messages({
    "any.required": "Ảnh không được để trống",
    "string.uri": "Ảnh phải là một đường dẫn hợp lệ",
  }),

  category_id: Joi.string().required().length(24).messages({
    "any.required": "Danh mục không được để trống",
    "string.length": "ID danh mục không hợp lệ",
  }),

  excerpt: Joi.string().required().min(3).trim().messages({
    "any.required": "Trích đoạn không được để trống",
    "string.min": "Trích đoạn có ít nhất 3 ký tự",
  }),

  content: Joi.string().required().min(3).trim().messages({
    "any.required": "Đoạn văn không được để trống",
    "string.min": "Đoạn văn có ít nhất 3 ký tự",
  }),

  status: Joi.string()
    .required()
    .valid("draft", "published", "archived")
    .messages({
      "any.required": "Trạng thái không được để trống",
      "any.only": "Trạng thái không hợp lệ",
      "string.empty": "Trạng thái không được để trống",
    }),
});
