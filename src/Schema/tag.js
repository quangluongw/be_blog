import Joi from "joi";

export const tagSchema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .trim()
      .messages({
        "any.required": "Tên thẻ không được để trống",
        "string.min": "Tên thẻ có ít nhất 3 ký tự"
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