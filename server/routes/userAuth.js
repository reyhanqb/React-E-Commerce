const express = require("express");
const db = require("./database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require("multer");
const uuid = require("uuid")

const router = express.Router();

dotenv.config({
  path: "./KEY.ENV",
});

const storage = multer.diskStorage({
  destination: "./payments",
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

router.get("/sessions", async (req, res) => {
  const token = req.cookies["connect.sid"] || "";
  if (token) {
    res.status(200).send("Session created");
  } else {
    res.status(500);
  }
});

router.post("/register", (req, res) => {
  const { username, pwd, email } = req.body;

  const query =
    "INSERT INTO users (username, user_email, PASSWORD) VALUES (?, ?, ?)";

  db.query(query, [username, email, pwd], async (error, results) => {
    if (error) {
      res.status(500).send("Error : ", error);
    } else {
      console.log(results);
      res.status(200).send("Successfully registered user");
    }
  });
});

router.post("/user-login", (req, res) => {
  const { username, password } = req.body;
  const jwtKey = process.env.SECRET_KEY;

  const query = "SELECT * FROM users WHERE username = ? AND PASSWORD = ?";

  db.query(query, [username, password], async (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results.length === 0) {
        console.log("x");
        res.status(500).send("x");
      } else {
        for (let i = 0; i < results.length; i++) {
          const user = results[i];
          let strp = user.PASSWORD;
          let match = password === strp;

          if (match) {
            req.session.user = user;
            let email = user.user_email;
            let uname = user.username;

            console.log("Logged in");
            const userToken = jwt.sign({ username, password }, jwtKey, {
              noTimestamp: true,
            });
            res.send({
              status: 200,
              userToken: userToken,
              email,
              uname,
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
  let {
    nama,
    address,
    details,
    email,
    total,
    city,
    province,
    zipcode,
    createdAt
  } = req.body;
  let token = uuid.v4();
  let query = `INSERT INTO orders (details, email, address, total, name, city, province, zipcode, date_created, payment_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    db.query(
      query,
      [
        details,
        email,
        address,
        total,
        nama,
        city,
        province,
        zipcode,
        createdAt,
        token,
      ],
      (err, result) => {
        if (err) throw err;

        console.log(token);
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/orders/payment",
  upload.single("payment_proof"),
  async (req, res) => {
    let { payment_method, account, payment_token } = req.body;
    let payment_proof = req.file.filename;

    if (!payment_proof) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const query =
      "INSERT INTO payment (payment_proof, payment_method, account_number, payment_token) VALUES (?, ?, ?, ?)";

    db.query(
      query,
      [payment_proof, payment_method, account, payment_token],
      (err, result) => {
        if (err) {
          console.error("Error inserting data into the database:", err);
          return res
            .status(500)
            .json({ error: "Failed to insert data into the database" });
        } else {
          console.log("Data inserted successfully:", result);
          res.status(200).json({ message: "Data inserted successfully" });
        }
      }
    );
  }
);

router.post("/orders/current", async (req, res) => {
  let username = req.body.username
  console.log(username)
  let query = "SELECT * FROM orders WHERE name = ?";

  db.query(query, [username], (err, result) => {
    if(err)
      throw err;

    console.log(result)
    res.send(result)
  })
})

router.post("/payment/details/:id", async (req, res) => {
  const id = req.params.id
  const query = "SELECT * FROM orders WHERE payment_token = ?"

  db.query(query, [id], (err, result) => {
    if(err)
      throw err;

    console.log(result)
  })
})

module.exports = router;
