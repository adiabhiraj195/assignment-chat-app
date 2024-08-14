import { Sequelize } from "sequelize";
import sequelize from "./config.js";
import { User } from "./user.model.js";

// Document.belongsTo(User);
// User.hasMany(Document);
// DocumentUser.belongsTo(User);
// User.hasMany(DocumentUser)
// DocumentUser.belongsTo(Document);
// Document.hasMany(DocumentUser);

const db = {
    Sequelize,
    sequelize,
    User,
    
};

export default db;