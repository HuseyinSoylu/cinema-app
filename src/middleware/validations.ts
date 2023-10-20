import { body } from "express-validator";

export const createUserValidation = [
  body("name").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 9, max: 32 }),
];

export const updateUserValidation = [
  body("name").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 9, max: 32 }),
];
