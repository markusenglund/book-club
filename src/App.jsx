import React, { Component } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Cookies from "js-cookie"

import "./styles.css"

import Header from "./components/Header"
import Home from "./components/Home"
import About from "./components/About"
import Profile from "./components/Profile"
import PrivateRoute from "./components/PrivateRoute"


class App extends Component {
  constructor() {
    super()
    this.state = { user: Cookies.get("user") }
  }

  render() {
    return (
      <Router>
        <div>
          <Header user={this.state.user} />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <PrivateRoute path="/profile" component={Profile} user={this.state.user} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
