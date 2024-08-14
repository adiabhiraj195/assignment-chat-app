import { Router } from "express";
import authController from "../controller/auth-controller.js";
import { uservalidator } from "../validator/auth-validator.js";
import { authenticate } from "../validator/authenticate.js";

const AuthRouter = Router();

AuthRouter.post("/register", uservalidator.isAllreadyPresent, authController.createUser);
AuthRouter.post("/login", uservalidator.login, authController.login);
AuthRouter.put("/update/:userId", authenticate, authController.updateUser);
AuthRouter.delete("/:userId", authenticate, authController.deleteUser);
AuthRouter.get("/", authenticate, authController.getAllUsers);


export default AuthRouter;