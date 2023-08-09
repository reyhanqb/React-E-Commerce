const { DataTypes } = require("sequelize");
const sequelize = require("../db.sequelize");

const Users = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: false,
    tableName: "users"
  }
);

module.exports = Users;
