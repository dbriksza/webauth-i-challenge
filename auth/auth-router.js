const bcrypt = require("bcryptjs"); // npm i bcryptjs

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let userInformation = req.body;

  const hash = bcrypt.hashSync(userInformation.password, 10);
  userInformation.password = hash;

  Users.add(userInformation)
    .then(saved => {
      // req.session.username = saved.username;
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that the password is valid
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("login error", error);
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({ message: "you're still here" });
      } else {
        res.status(200).json({ message: "logged out successfully" });
      }
    });
  } else {
    res.status(200).json({ message: "ok bye I guess" });
  }
});

module.exports = router;
