import React, { Component } from "react"
import axios from "axios"

import InputForm from "./InputForm"

// import BookGrid from "./BookGrid"

class MyBooks extends Component {
  constructor() {
    super()
    this.state = { books: [] }
    this.updateBooks = this.updateBooks.bind(this)
  }

  componentDidMount() {
    axios.get("/api/my-books")
      .then((result) => {
        this.updateBooks(result.data)
      })
  }

  updateBooks(books) {
    this.setState({ books })
  }

  deleteBook(id) {
    axios.delete("/api/books", { params: { id } })
      .then((result) => {
        this.updateBooks(result.data)
      })
  }

  render() {
    return (
      <div>
        <h1>My books</h1>
        <InputForm updateBooks={this.updateBooks} />
        {this.state.books.map(book => (
          <div className="thumbnail my-book" key={book._id}>
            <img src={book.thumbnail} alt={book.title} />
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => this.deleteBook(book._id)}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default MyBooks
