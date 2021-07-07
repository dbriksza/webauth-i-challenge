const router = require("express").Router();

const Users = require("./users-model.js");
const requiresAuth = require("../auth/require-auth-middleware.js");

router.get("/", requiresAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
