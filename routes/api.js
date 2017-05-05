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

// Add a new book to the database
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
          requestedBy: null,
          requestApproved: false
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
  Book.findOneAndRemove({ owner: req.user._id, _id: req.query.id }, (err) => {
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

// Get requests made by the user
router.get("/out-requests", (req, res) => {
  Book.find({ requestedBy: req.user._id }, (err, docs) => {
    if (err) {
      res.error(err)
    } else {
      res.send(docs)
    }
  })
})

// Get incoming requests for the user's books
router.get("/request", (req, res) => {
  Book.find({ owner: req.user._id, requestedBy: { $ne: null } }, (err, docs) => {
    if (err) {
      res.error(err)
    } else {
      res.send(docs)
    }
  })
})

// FIXME: Actually not secure since logged-in users could overwrite other peoples requests
router.post("/request", (req, res) => {
  if (req.isAuthenticated()) {
    Book.findByIdAndUpdate(req.body.id, { requestedBy: req.user._id }, (err, docs) => {
      if (err) {
        res.error(err)
      } else {
        res.send(docs)
      }
    })
  }
})

// FIXME: Api is not secure
router.put("/request", (req, res) => {
  Book.findByIdAndUpdate(req.body.id, { requestApproved: true }, (err) => {
    if (err) {
      res.error(err)
    } else {
      res.send("The request was approved")
    }
  })
})

// Delete a request FIXME: Not secure
router.delete("/request", (req, res) => {
  Book.findByIdAndUpdate(req.query.id, { requestedBy: null }, (err) => {
    if (err) {
      res.error(err)
    } else {
      // TODO: Make proper response
      res.send("The request was deleted")
    }
  })
})

module.exports = router
