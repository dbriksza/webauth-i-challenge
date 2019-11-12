const bcrypt = require("bcryptjs"); // npm i bcryptjs

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let userInformation = req.body;

  const hash = bcrypt.hashSync(userInformation.password, 10);
  userInformation.password = hash;

  Users.add(userInformation)
    .then(saved => {
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

module.exports = router;
