const passport = require("passport")
const express = require("express")

const router = express.Router()

router.get("/twitter", passport.authenticate("twitter"))

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.cookie("user", req.user._id.toString())
    res.redirect("/profile")
  }
)

module.exports = router
