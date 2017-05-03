import React, { Component } from "react"
import PropTypes from "prop-types"
import axios from "axios"

class ProfileItem extends Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value, editMode: false }
  }

  onChange(event) {
    this.setState({ value: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    axios.post("/api/profile", { attr: this.props.attr, value: this.state.value })
    this.setState({ editMode: false })
  }

  // TODO: Make form inline
  renderItemOrEdit() {
    if (this.state.editMode) {
      return (
        <form className="profile-form" onSubmit={e => this.onSubmit(e)}>
          <input type="text" value={this.state.value} onChange={e => this.onChange(e)} />
          <button type="submit">Apply</button>
        </form>
      )
    }
    return (
      <span>
        <span>{this.state.value} </span>
        <button onClick={() => this.setState({ editMode: true })}>Edit</button>
      </span>
    )
  }

  render() {
    return (
      <div>
        <span>{this.props.prettyAttr}: </span>
        {this.renderItemOrEdit()}
      </div>
    )
  }
}

ProfileItem.propTypes = {
  attr: PropTypes.string.isRequired,
  prettyAttr: PropTypes.string.isRequired,
  value: PropTypes.string
}

ProfileItem.defaultProps = {
  value: ""
}

export default ProfileItem
