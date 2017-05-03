const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  displayName: String,
  twitterId: String,
  city: String,
  country: String
})

module.exports = mongoose.model("User", schema)
