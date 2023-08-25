const express = require("express");
const db = require("./database");
const dotenv = require("dotenv");
const cors = require("cors");
const { resolve } = require("path")
const fs = require("fs")


const router = express.Router();

const dirname = resolve("payment_proof-1692952048618.png");

console.log(dirname)

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
      
      
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/payment-details/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = "SELECT * FROM orders WHERE payment_token = ?";

  db.query(query, [id], (err, result) => {
    if (err) throw err;

    res.send(result)

    console.log(result);
  });
});

router.post("/payment-details/img/:id", async (req, res) => {
  const id = req.params.id;
  const query = "SELECT payment_proof FROM payment WHERE payment_token = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      throw err;
    }

    const imagePath = `../../React-E-Commerce/server/payments/${result[0].payment_proof}`;

    // Baca file gambar
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        throw err;
      }

      // Ubah data gambar menjadi base64 encoded string
      const base64Image = data.toString("base64");

      // Kirim base64 encoded string sebagai respons
      res.send({ image: base64Image });
    });
  });
});


module.exports = router;
