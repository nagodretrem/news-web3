const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name must be at most 100 characters long",
            "any.required": "Name is required",
          }),
          lastname: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Lastname must be a string",
            "string.empty": "Lastname cannot be empty",
            "string.min": "Lastname must be at least 3 characters long",
            "string.max": "Lastname must be at most 100 characters long",
            "any.required": "Lastname is required",
          }),
          email: joi.string().trim().email().required().messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email",
            "any.required": "Email is required",
          }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password must be at most 36 characters long",
            "any.required": "Password is required",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      throw new APIError(error.details[0].message);
    }
    next();
  };
  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi.string().trim().email().required().messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email",
            "any.required": "Email is required",
          }),
          password: joi.string().trim().required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password cannot be empty",
            "any.required": "Password is required",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      throw new APIError(error.details[0].message);
    }
    next();
  };
}

module.exports = authValidation;
