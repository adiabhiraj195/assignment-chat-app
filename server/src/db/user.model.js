import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    role:{
        type: DataTypes.STRING,
        defaultValue: "student"
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
});

export { User };