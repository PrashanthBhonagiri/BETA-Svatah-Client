const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .regex(/\S+@\S+\.\S+/)
    .required(),

  password: Joi.string()
    .trim()
    .min(6)
    .required(),
});

module.exports = schema;