const express = require("express")
const axios = require("axios")
const Book = require("../models/Book")
const User = require("../models/User")

const router = express.Router()

router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(req.user)
  }
  return res.error("You're not authenticated")
})

router.post("/profile", (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { [req.body.attr]: req.body.value } },
    (err, docs) => {
      if (err) {
        res.error(err)
      } else {
        res.send(docs)
      }
    }
  )
})

router.get("/my-books", (req, res) => {
  if (req.isAuthenticated()) {
    Book.find({ owner: req.user._id }, (error, docs) => {
      if (error) {
        res.error(error)
      } else {
        res.send(docs)
      }
    })
  }
})

router.get("/all-books", (req, res) => {
  Book.find({}, (error, docs) => {
    if (error) {
      res.error(error)
    } else {
      res.send(docs)
    }
  })
})

router.post("/books", (req, res) => {
  if (req.isAuthenticated()) {
    // TODO: Make a request to the google books api
    axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      { params: {
        q: req.body.search,
        maxResults: 1
      } }
    )
      .then((result) => {
        const volumeInfo = result.data.items[0].volumeInfo
        const book = new Book({
          title: volumeInfo.title,
          thumbnail: volumeInfo.imageLinks.thumbnail,
          owner: req.user._id,
          requestedBy: []
        })

        book.save((err) => {
          if (err) {
            res.error(err)
          } else {
            Book.find({ owner: req.user._id }, (error, docs) => {
              if (error) {
                res.error(error)
              } else {
                res.send(docs)
              }
            })
          }
        })
      })
  } else {
    res.send("Not authenticated")
  }
})

router.delete("/books", (req, res) => {
  Book.findOneAndRemove({ _id: req.query.id }, (err) => {
    if (err) {
      res.error(err)
    } else {
      Book.find({ owner: req.user._id }, (error, docs) => {
        if (error) {
          res.error(error)
        } else {
          res.send(docs)
        }
      })
    }
  })
})

// Get incoming requests
router.get("/request", (req, res) => {
  Book.find({ owner: req.user._id, requestedBy: { $gt: [] } }, (err, docs) => {
    if (err) {
      res.error(err)
    } else {
      res.send(docs)
    }
  })
})

router.post("/request", (req, res) => {
  Book.findByIdAndUpdate(req.body.id, { $push: { requestedBy: req.user._id } }, (err, docs) => {
    if (err) {
      res.error(err)
    } else {
      res.send(docs)
    }
  })
})

module.exports = router
