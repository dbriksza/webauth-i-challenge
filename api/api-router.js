const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ api: "working" });
});

module.exports = router;
