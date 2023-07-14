const express = require("express");
const db = require("../database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const router = express.Router();

dotenv.config({
  path: "./KEY.ENV",
});

router.post("/register", (req, res) => {
  const { username, pwd, address, email } = req.body;

  const query =
    "INSERT INTO users (username, email, password, address) VALUES (?, ?, ?, ?)";

  db.query(query, [username, email, pwd, address], async (error, results) => {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.sendStatus(200).send("Successfully registered user");
    }
  });
});

router.post("/login", (req, res) => {
  const { username, pwd } = req.body;
  const jwtKey = process.env.SECRET_KEY;

  const query = "SELECT * FROM users WHERE username = ? AND PASSWORD = ?";

  db.query(query, [username, pwd], async (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results.length === 0) {
        console.log("x");
        res.status(500).send("x");
      } else {
        for (let i = 0; i < results.length; i++) {
          const user = results[i];
          let strp = user.password;
          let match = pwd === strp;

          if (match) {
            console.log("Logged in");
            const userToken = jwt.sign({ username, pwd }, jwtKey, {
              noTimestamp: true,
            });
            res.send({
              status: 200,
              userToken: userToken,
            });
          } else {
            res.status(400).send("x");
          }
        }
      }
    }
  });
});

router.post("/create-orders", async (req, res) => {
  let { nama, alamat, order, email, total, createdAt } = req.body;
  let query = `INSERT INTO orders (orders, email, address, total, name, date_created) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    db.query(query, [order, email, alamat, total, nama, createdAt], (err, result) => {
      if (err) throw err;
      

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
