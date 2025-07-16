import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .trim()
      .messages({
        "any.required": "Tên danh mục không được để trống",
        "string.min": "Tên danh mục có ít nhất 3 ký tự"
      }),
      slug: Joi.string()
      .required()
      .min(3)
      .trim()
      .messages({
        "any.required": "Slug không được để trống",
        "string.min": "Slug có ít nhất 3 ký tự"
      }),
  });