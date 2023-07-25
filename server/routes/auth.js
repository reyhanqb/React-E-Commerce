const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");
const dotenv = require("dotenv");
const cors = require("cors")


const router = express.Router();

dotenv.config({
  path: "./KEY.ENV",
});

router.options("/complete-orders/:id", cors());

router.post("/login", (req, res) => {
  const { username, pwd } = req.body;
  const jwtKey = process.env.SECRET_KEY;

  const query = "SELECT * FROM admins WHERE username = ? AND password = ?";


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
            const accessToken = jwt.sign({ username, pwd }, jwtKey, {
              noTimestamp: true,
            });
            res.send({
              status: 200,
              accessToken: accessToken,
              user: req.session.user,
            });
          } else {
            res.status(400).send("x");
          }
        }
      }
    }
  });
});

router.get("/orders", (req, res) => {
  let query = "SELECT * FROM ORDERS";

  try {
    db.query(query, async (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/complete-orders/:id", cors(), async (req, res) => {
  let order_id = req.params.id;
  let date_finished = req.body.date_finished;
  let query = "UPDATE orders SET date_finished = ? WHERE order_id = ?";

  res.setHeader("Access-Control-Allow-Methods", "*");

  try {
    db.query(query, [date_finished, order_id], (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/payment-details/:token", async (req, res) => {
  let token = req.params.token
  let query = "SELECT * FROM payment WHERE payment_token = ?"

  try {
    db.query(query, [token], async (err, result) => {
      if(err)
        throw err;

      console.log(token)
  
      res.status(200)
      res.send(result)
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("connect.sid");
  res.status(200).send("Logged out");
});

module.exports = router;
