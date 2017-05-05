import React, { Component } from "react"
import axios from "axios"

import RequestList from "./RequestList"

class Requests extends Component {
  constructor() {
    super()
    this.state = {
      outgoingRequests: [],
      incomingRequests: [],
      showIncoming: false,
      showOutgoing: false
    }
  }

  componentDidMount() {
    this.getAllReqs()
  }

  getAllReqs() {
    axios.all([axios.get("/api/request"), axios.get("api/out-requests")])
      .then(axios.spread((incoming, outgoing) => {
        this.setState({ incomingRequests: incoming.data, outgoingRequests: outgoing.data })
      }))
  }

  toggleIncomingRequests() {
    this.setState({ showIncoming: !this.state.showIncoming, showOutgoing: false })
  }

  toggleOutgoingRequests() {
    this.setState({ showOutgoing: !this.state.showOutgoing, showIncoming: false })
  }

  // FIXME: We're making two roundtrips to the db everytime these two functions get called
  approveRequest(id) {
    axios.put("/api/request", { id })
      .then(() => this.getAllReqs())
  }

  removeRequest(id) {
    axios.delete("/api/request", { params: { id } })
      .then(() => this.getAllReqs())
  }

  render() {
    return (
      <div className="requests">
        <button onClick={() => this.toggleOutgoingRequests()}>
          Your trade requests ({this.state.outgoingRequests.length})
        </button>
        <button onClick={() => this.toggleIncomingRequests()}>
          Trade requests for you ({this.state.incomingRequests.length})
        </button>
        {this.state.showIncoming ?
          <RequestList
            removeRequest={id => this.removeRequest(id)}
            approveRequest={id => this.approveRequest(id)}
            requests={this.state.incomingRequests}
          />
          : null
        }
        {this.state.showOutgoing ?
          <RequestList
            requests={this.state.outgoingRequests}
            removeRequest={id => this.removeRequest(id)}
          />
          : null
        }
      </div>
    )
  }
}

export default Requests
