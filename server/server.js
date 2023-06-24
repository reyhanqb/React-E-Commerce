const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

let app = express();

let port = 3001;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.post("/products/fetch", async (req, res) => {
  try {
    let query = "";
    db.query(query, (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-orders", async (req, res) => {
  let { nama, alamat, order, email, total } = req.body;
  let query = `INSERT INTO orders (orders, email, address, total, name) VALUES (?, ?, ?, ?, ?)`;
  try {
    db.query(query, [order, email, alamat, total, nama], (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
