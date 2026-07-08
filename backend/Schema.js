import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  mobileNo: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
});

export const listingSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(100)
    .required(),

  description: Joi.string()
    .min(20)
    .max(500)
    .required(),

  rent: Joi.number()
    .min(1)
    .required(),

  city: Joi.string()
    .min(2)
    .max(50)
    .required(),

  landmark: Joi.string()
    .min(2)
    .max(100)
    .required(),

  category: Joi.string()
    .valid(
      "Apartment",
      "Villa",
      "Farm House",
      "Beach",
      "Mountain",
      "Hotel",
      "Cabin",
      "Camping"
    )
    .required()
});