import React, { Component } from "react"
import PropTypes from "prop-types"
import axios from "axios"

class InputForm extends Component {
  constructor() {
    super()
    this.state = { value: "" }
  }

  onChange(event) {
    this.setState({ value: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()

    // We might need some error handling for when nothing is found.
    // Look at stock market app for that
    axios.post("/api/books", { search: this.state.value })
      .then((result) => {
        this.props.updateBooks(result.data)
      })
    this.setState({ value: "" })
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input type="text" value={this.state.value} onChange={e => this.onChange(e)} required />
        <button type="submit">Add book</button>
      </form>
    )
  }
}

InputForm.propTypes = { updateBooks: PropTypes.func.isRequired }

export default InputForm
