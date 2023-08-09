const express = require("express");
const cors = require("cors");
const sessions = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// require("./middlewares/validate")(passport);

const Admin = require("./auth");

const Users = require("./routes/userAuth");

const test = require("./routes/authentications");

const validate = require("./middlewares/validate")

let app = express();

app.use(cookieParser());

const port = 3001;

dotenv.config({
  path: "./KEY.ENV",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    secure: false,
  })
);

app.options("*", cors());

app.use(express.json());

// app.use(
//   sessions({
//     secret: "hello",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       expires: 360000,
//     },
//   })
// );

// admin routes
app.use("/admin", Admin);

// user routes
app.use("/", Users);

app.use("/auth", test);

// app.use(validate)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
