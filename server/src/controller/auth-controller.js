import { validationResult } from "express-validator";
import userServices from "../services/user-services.js";
import db from "../db/index.js";

class Authcontroller {
  createUser = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err);
      return res.status(400).json(err);
    }

    const { fullName, email, password, phoneNumber, role } = req.body;

    await userServices.createUser(fullName, email, password, phoneNumber, role);

    return res.status(201).json({
      status: "ok",
    });
  };

  login = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { email, password } = req.body;

    const user = await userServices.findUserByEmail(email);
    // console.log(user.dataValues.documents);
    if (!user) {
      return res.status(400).json({
        error: "User is not found",
      });
    }
    const checkPassword = await userServices.checkPassword(
      password,
      user.password
    );
    if (!checkPassword) {
      return res.status(400).json({
        error: "Password is not correct",
      });
    }

    const authResponse = await userServices.generateAuthResponse(user);
    return res.status(200).json(authResponse);
  };

  updateUser = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json(err);

    const { userId } = req.params;
    const { fullName, phoneNumber, role } = req.body;

    const user = await userServices.findUserById(userId);
    // console.log(document);
    if (user === null) return res.sendStatus(404);

    if (fullName !== undefined && fullName !== null) user.fullName = fullName;
    if (phoneNumber !== undefined && phoneNumber !== null)
      user.phoneNumber = phoneNumber;
    if (role !== undefined && role !== null) user.role = role;
    // if (isPublic !== undefined && isPublic !== null)
    //     document.isPublic = isPublic;
    await user.save();

    return res.sendStatus(200);
  };

  deleteUser = async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const { userId } = req.params;

    await userServices.destroy(userId);

    return res.sendStatus(200);
  };

  getAllUsers = async(req, res)=>{
    const users = await db.User.findAll();
    console.log(users);
    return res.status(200).json(users);
  }
}

const authController = new Authcontroller();

export default authController;
