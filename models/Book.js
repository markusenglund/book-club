const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  owner: String,
  requestedBy: String,
  requestApproved: Boolean
})

module.exports = mongoose.model("Book", schema)
