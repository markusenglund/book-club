import React, { Component } from "react"
import axios from "axios"

class Home extends Component {
  constructor() {
    super()
    this.state = { books: [] }
  }

  componentDidMount() {
    axios.get("/api/all-books")
      .then((result) => {
        this.setState({ books: result.data })
      })
  }

  onRequest(id) {
    axios.post("/api/request", { id })
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
            <i
              onClick={() => this.onRequest(book._id)}
              className="fa fa-arrows-h"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Home
