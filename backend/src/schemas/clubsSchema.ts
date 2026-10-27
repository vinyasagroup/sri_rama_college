import Joi from "joi";

// ================= Save / Update Club Validation =================

export const validateClub = (data: any) => {

  const schema = Joi.object({

    clubName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Club Name is required"
      }),

    clubCategory: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Club Category is required"
      }),

    clubShortDescription: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Short Description is required"
      }),

    overview: Joi.array()
      .items(
        Joi.object({
          paragraph: Joi.string()
            .trim()
            .required()
            .messages({
              "string.empty": "Overview Paragraph is required"
            })
        })
      )
      .min(1)
      .required(),

    coordinators: Joi.array()
      .items(
        Joi.object({

          name: Joi.string()
            .trim()
            .required()
            .messages({
              "string.empty": "Faculty Name is required"
            }),

          designation: Joi.string()
            .trim()
            .required()
            .messages({
              "string.empty": "Faculty Designation is required"
            })

        })
      )
      .min(1)
      .required()

  });

  return schema.validate(data);

};