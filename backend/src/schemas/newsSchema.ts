import Joi from "joi";

export const validateNews = (data: any) => {

  const schema = Joi.object({

    title: Joi.string().required(),

    category: Joi.string().required(),

    description: Joi.string().required(),

    date: Joi.string().required(),

    paragraphs: Joi.any().required(),

    oldBanner: Joi.string()
      .allow("")
      .optional(),

  });

  return schema.validate(data);

};