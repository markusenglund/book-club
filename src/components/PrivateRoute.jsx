import React from "react"
import { Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"

const PrivateRoute = ({ path, component, user }) => {
  if (user) {
    return <Route path={path} component={component} />
  }
  return <Redirect to="/" />
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  user: PropTypes.string
}
PrivateRoute.defaultProps = {
  user: null
}

export default PrivateRoute
