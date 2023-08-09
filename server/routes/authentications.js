const express = require("express");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const Admins = require("../models/admins");

const router = express.Router();

const day = dayjs();

router.get("/sessions",  async (req, res) => {
  const cookie =  req.cookies["auth"]
  const adminCookie = req.cookies["admin-session"]

  // console.log(cookie)

  if(cookie){
    res.send({
      status: 200,
      message: "Welcome back!"
    })
  } else if(adminCookie){
    res.send({
      status: 201,
      message: "Authenticated as an admin"
    })
  } 
  else {
    res.json({
      message: "You are unauthenticated",
      status: 400
    })
  }
})

router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  const authenticated = await UserModel.findOne({
    where: {
      username: username,
    },
  });

  if (!authenticated) {
    return res.status(401).json({ message: "User does not exist" });
  }

  if (authenticated.PASSWORD !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: authenticated.id,
      username: authenticated.username,
      email: authenticated.email,
    },
    process.env.SECRET_KEY
  );

  let user = authenticated;
  user.id = undefined;
  user.PASSWORD = undefined;

  res.cookie("auth", token, {
    secure: false,
    httpOnly: true,
    expires: dayjs().add(1, "days").toDate(),
    resave: false,
  });

  res.json({ message: "Logged in", user: user, status: 200 });
});

router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body

  const authenticated = await Admins.findOne({
    where: {
      username: username,
    },
  });

  if (!authenticated) {
    return res.status(401).json({ message: "You are not an admin" });
  }

  if (authenticated.PASSWORD !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: authenticated.id,
      username: authenticated.username,
    },
    process.env.SECRET_KEY
  );

  let user = authenticated
  user.password = undefined

    res.cookie("admin-session", token, {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(1, "days").toDate(),
      resave: false,
    });

    res.json({ message: "Logged in", user: user, status: 200 });
})

router.post("/logout", (req, res) => {
// res.cookie("auth", { httpOnly: true, maxAge: new Date(-1) });
  res.clearCookie("auth").send("xx");
//   res.json({ message: "User logged out" });
});

module.exports = router;
