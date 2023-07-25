const express = require("express");
const cors = require("cors");
const sessions = require("express-session");
const dotenv = require("dotenv");

const Admin = require("./routes/auth");

const Users = require("./routes/userAuth");

let app = express();

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

app.use(
  sessions({
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: 360000
    },
  })
);

// admin routes
app.use("/admin", Admin);

// user routes
app.use("/", Users);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
