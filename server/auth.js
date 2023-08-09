const express = require("express");
const jwt = require("jsonwebtoken");
const sqlz = require("./db.sequelize");
const db = require("./routes/database");
const dotenv = require("dotenv");
const cors = require("cors");

const router = express.Router();

dotenv.config({
  path: "./KEY.ENV",
});

router.options("/complete-orders/:id", cors());

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

router.get("/payment-details/:token", (req, res) => {
  let token = req.query.token;
  let query = "SELECT * FROM payment WHERE payment_token = ?";

  try {
    db.query(query, [token], async (err, result) => {
      if (err) throw err;

      res.status(200);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
