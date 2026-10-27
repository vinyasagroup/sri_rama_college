import Joi from "joi";

// ================= Save / Update Carousel Validation =================

export const validateCarousel = (data: any) => {

  const schema = Joi.object({

    carouselImage: Joi.string()
      .allow("")
      .optional()

  });

  return schema.validate(data);

};