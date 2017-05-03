import React, { Component } from "react"
import axios from "axios"

import MyBooks from "./MyBooks"
import Requests from "./Requests"
import ProfileItem from "./ProfileItem"


class Profile extends Component {
  constructor() {
    super()
    this.state = { info: null }
  }

  componentDidMount() {
    axios.get("/api/profile")
      .then((res) => {
        this.setState({ info: res.data })
      })
  }
  // TODO: Make this code more DRY
  render() {
    return (
      <div>
        <h2>Profile</h2>
        {this.state.info ?
          <div>
            <ProfileItem
              attr="displayName"
              prettyAttr="Display name"
              value={this.state.info.displayName}
            />
            <ProfileItem
              attr="city"
              prettyAttr="City"
              value={this.state.info.city}
            />
            <ProfileItem
              attr="country"
              prettyAttr="Country"
              value={this.state.info.country}
            />
          </div>
           :
          <h3>Loading...</h3>
        }
        <Requests />
        <MyBooks />
      </div>
    )
  }
}

export default Profile
