import React from "react"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

const Header = (props) => {
  return (
    <div className="header">
      <NavLink exact to="/">Book club</NavLink>
      {props.user ?
        <span>
          <NavLink to="/profile">Profile</NavLink>
        </span> :
        <a href="/auth/twitter"><i className="fa fa-twitter" aria-hidden="true" /> Sign in</a>
      }
      <NavLink to="/about">About</NavLink>
    </div>
  )
}

Header.propTypes = { user: PropTypes.string }
Header.defaultProps = { user: null }

export default Header
