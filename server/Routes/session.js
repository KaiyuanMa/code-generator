const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  try {
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await User.findOne({
      where: {
        username: credentials.username,
      },
    });
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      res.send(jwt.sign({ id: user.id }, process.env.JWT));
    } else {
      const error = new Error("Bad Credentials");
      error.status = 401;
      throw error;
    }
  } catch (ex) {
    next(ex);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
