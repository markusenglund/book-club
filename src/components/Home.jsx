import React, { Component } from "react"
import axios from "axios"
import Cookies from "js-cookie"

// TODO: Make sure that the user doesn't see the trade icon if:
// Is not logged in
// Is the owner of the book
// The book has already been requested

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { books: [], user: Cookies.get("user") }
  }

  componentDidMount() {
    this.getAllBooks()
  }

  // FIXME: Two roundtrips to the database is one too many
  onRequest(id) {
    axios.post("/api/request", { id })
      .then(() => {
        this.getAllBooks()
      })
  }

  getAllBooks() {
    axios.get("/api/all-books")
      .then((result) => {
        this.setState({ books: result.data })
      })
  }

  shouldTradeIconRender(book) {
    if (!this.state.user) {
      return false
    } else if (book.requestedBy) {
      return false
    } else if (book.owner === this.state.user) {
      return false
    }
    return true
  }

  // TODO: Make combined book collage component
  // FIXME: Shouldn't be able to click trade icon if already requested or if one's own book
  render() {
    return (
      <div>
        <h1>All books</h1>
        {this.state.books.map(book => (
          <div className="thumbnail all-book" key={book._id}>
            <img src={book.thumbnail} alt={book.title} />
            {this.shouldTradeIconRender(book) ?
              <i
                onClick={() => this.onRequest(book._id)}
                className="fa fa-arrows-h"
                aria-hidden="true"
              />
              : null
            }
          </div>
        ))}
      </div>
    )
  }
}

export default Home
