import Joi from "joi";

export const testimonialSchema = Joi.object({
  testimonial_name: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Testimonial Name is required",
    }),

  testimonial_role: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Testimonial Role is required",
    }),

  testimonial_description: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Testimonial Description is required",
    }),

  testimonial_photo: Joi.string()
    .allow("")
    .optional(),
});