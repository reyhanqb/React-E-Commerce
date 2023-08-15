const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const Admin = require("./routes/auth");

const Users = require("./routes/userAuth");

const test = require("./routes/authentications");



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

// admin routes
app.use("/admin", Admin);

// user routes
app.use("/", Users);

// authentications
app.use("/auth", test);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
