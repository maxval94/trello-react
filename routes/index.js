const express = require("express");
const router = express.Router();

const isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.ejs", {
      user: req.user
    });
  } else {
    res.render("index.ejs", {
      user: null
    });
  }
};

router.get("/", isLoggedIn);

module.exports = router;
