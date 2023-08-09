const { DataTypes } = require("sequelize");
const sequelize = require("../db.sequelize");

const Admins = sequelize.define(
  "admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: false,
  }
);

module.exports = Admins;
