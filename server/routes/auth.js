const express = require("express");
const db = require("./database");
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

router.post("/payment-details/:token", async (req, res) => {
  let token = req.params.token;
  token = token.replace(":", "");
  console.log(token)

  let query = "SELECT * FROM payment WHERE payment_token = ?";

  try {
    db.query(query, [token], async (err, result) => {
      if (err) throw err;

      
      res.send(result);
      res.sendFile(`${result[0].payment_proof}`, { root: './payments/'})
      
    });
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
