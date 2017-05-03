import React, { Component } from "react"
import axios from "axios"

class Requests extends Component {
  constructor() {
    super()
    this.state = { outgoingRequests: [], incomingRequests: [] }
  }

  // TODO: Add functionality of seeing all requests, who requested (?) and ability to accept requests.
  componentDidMount() {
    axios.get("/api/request")
      .then((result) => {
        this.setState({ incomingRequests: result.data }) // Maybe not the data structure we want
      })
  }

  showIncomingRequests() {
    // Do stuff
  }

  render() {
    return (
      <div>
        <button>Your trade requests ({this.state.outgoingRequests.length})</button>
        <button onClick={this.showIncomingRequests}>
          Trade requests for you ({this.state.incomingRequests.length})
        </button>
      </div>
    )
  }
}

export default Requests
