import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/index.js";

class UserServices {
  createUser = async (fullName, email, password, phoneNumber, role) => {
    const salt = await genSalt();
    const hashPassword = await hash(password, salt);
    const verificationToken = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET
    );
    await db.User.create({
      id: this.generateUserId(),
      fullName: fullName,
      email: email,
      password: hashPassword,
      phoneNumber,
      role,
      verificationToken: verificationToken,
    });
    console.log("userCreated");
  };

  generateUserId = () => {
    const date = new Date();
    return date.getTime().toString();
  };

  findUserByEmail = async (email) => {
    return await db.User.findOne({
      where: {
        email: email,
      },
    });
  };
  findUserById = async (userId) => {
    return await db.User.findOne({
      where: {
        id: userId,
      },
    });
  };

  checkPassword = async (password, ActualPassword) => {
    return await compare(password, ActualPassword);
  };

  generateAuthResponse = async (user) => {
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    // console.log(accessToken)

    return { accessToken };
  };

  destroy = async (userId) => {
    return await db.User.destroy({
      where: {
        id: userId,
      },
    });
  };
}

const userServices = new UserServices();

export default userServices;
