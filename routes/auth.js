const router = require("express").Router();
const passport = require("passport");
// const jwt = require("jsonwebtoken");

require("../config/passport-setup");
require("dotenv").config();


// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    // session: false,
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.events"
    ]
  }),
  
);

// callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect('/api/user/profile')
  }
  );
  
  module.exports = router;
  
  // const token = jwt.sign({ id: req.user._id }, process.env.TOKEN_SECRET);
  // res.status(200).json({ token });