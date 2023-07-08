const express = require("express");
const cors = require("cors");
const sessions = require("express-session");
const dotenv = require("dotenv")

const Register = require("./routes/userAuth")
const Login = require("./routes/auth");
const Orders = require("./routes/auth")
const CurrentOrder = require("./routes/userAuth");

let app = express();

const port = 3001;

dotenv.config({
  path: "./KEY.ENV",
});

app.use(cors());
app.use(express.json());

app.use(
  sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
  })
);

// admin routes
app.use("/admin", Login);
app.use("/admin", Orders)

// user routes
app.use("/", Register)
app.use("/", CurrentOrder)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});





