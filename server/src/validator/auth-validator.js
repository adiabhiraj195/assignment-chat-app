import { body } from "express-validator";
import userServices from "../services/user-services.js";

class UserValidator {
  isAllreadyPresent = [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must provide a valid email address"),
    body("email").custom(async (email) => {
      const user = await userServices.findUserByEmail(email);
      if (user) {
        return Promise.reject("User with that email allready exists");
      }
      return true;
    }),
    body("password")
      .isLength({ min: 8, max: 25 })
      .withMessage("Password must be between 8 to 35 character"),
  ];

  login = [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must Provide a valid email"),
    body("password").exists().withMessage("Must provide a password."),
  ];
}

const uservalidator = new UserValidator();

export { uservalidator };
