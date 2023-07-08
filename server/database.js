const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react-ecommerce",
});

db.connect(function (err, result) {
  if (err) throw err;

  console.log("Successfully connected");
});

module.exports = db;