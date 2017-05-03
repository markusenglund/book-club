const mongoose = require("mongoose")

// TODO: Change owner and requestedBy to some sort of object reference
const schema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  owner: String,
  requestedBy: [String]
})

module.exports = mongoose.model("Book", schema)
