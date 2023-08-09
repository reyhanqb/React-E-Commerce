const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce-db-test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

sequelize.sync();

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};

authenticate();

module.exports = sequelize;
