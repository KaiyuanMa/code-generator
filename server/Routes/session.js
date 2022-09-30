const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require('axios');

router.post("/", async (req, res, next) => {
  try {
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    res.send({ token: await User.authenticate(credentials) });
  } catch (ex) {
    next(ex);
  }
});

router.get("/github", (req, res, next) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
});

router.get('/github/callback', async(req, res, next) => {
  try {
    let response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code
    }, {
      headers: {
        accept: 'application/json'
      }
    });
    const { error, access_token } = response.data;
    if(error){
      const ex = new Error(error);
      ex.status = 401;
      next(ex);
    }
    else {
      response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${ access_token }`
        }
      });
      const { login, email, id } = response.data;
      const where = {
        username: login,
        email: email,
        githubId: id
      };
      let user = await User.findOne({ where });
      if(!user){
        user = await User.create({ ...where, password: 'password' });
      }
      const token = require('jsonwebtoken').sign({ id: user.id }, process.env.JWT);
      res.send(`
        <html>
          <head>
            <script>
              window.localStorage.setItem('token', '${ token }');
              window.location = '/';
            </script>
          </head>
          <body>
          ...Signing In
          </body>
        </html>
      `);
    }
  }
  catch(ex){
    next(ex);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});
router.post("/signup", async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        username: req.body.username,
      },
    });
    if (users.length === 0) {
      await User.create(req.body);
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      };
      res.send({ token: await User.authenticate(credentials)})
    } else {
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      };
      res.send({ token: await User.authenticate(credentials) });
    }
  } catch (er) {
    next(er);
  }
});

module.exports = router;
