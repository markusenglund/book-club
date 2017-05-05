import React from "react"

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        This web application was build as part of Free code camp.
        The requirements and an example of what the app should look like can
        be found <a href="https://www.freecodecamp.com/challenges/manage-a-book-trading-club">here</a>.
        The example app was very limited in functionality, notably not giving the users any way of
        contacting each other. I did not try to improve on it in this project so the same can be
        said for this website.
      </p>
      <h3>How to use</h3>
      <p>
        In order to use the app you have to log in using Twitter. Once you are logged in
        you can enter books that you want to trade. You can also change some user info.
        You can request other users books by clicking the green double arrow that
        is on the cover of certain books. However, only books that has not been requested
        by anyone else can be requested by you. Once you receive a request for your book,
        you can choose to accept or deny the request. That is it. You do not get to
        choose someone elses book so you can make an actual trade, or make sure
        that you are in the same city. You do not even get the contact info of
        your trading partner.
      </p>
      <h3>Technologies used</h3>
      <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>MongoDB</li>
        <li>Google books search API</li>
      </ul>
    </div>
  )
}

export default About
