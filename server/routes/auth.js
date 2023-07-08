const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");
const dotenv = require("dotenv")

const router = express.Router();

dotenv.config({
  path: "./KEY.ENV",
});



router.post("/login", (req, res) => {
  const { username, pwd } = req.body;
  const jwtKey = process.env.SECRET_KEY;

  const query = "SELECT * FROM admin WHERE username = ? AND password = ?";
  // const password = `SELECT * FROM admin WHERE password = ${pwd}`

  db.query(query, [username, pwd], async (error, results) => {
    console.log(query);

    // console.log(match)
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
            const accessToken = jwt.sign({ username, pwd }, jwtKey, {
              noTimestamp: true,
            });
            res.send({
              status: 200,
              accessToken: accessToken,
            });
          } else {
            res.status(400).send("x");
          }
        }
      }
    }
  });
});

router.get("/orders", async (req, res) => {
  let query = "SELECT * FROM ORDERS";

  try {
    db.query(query, (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
