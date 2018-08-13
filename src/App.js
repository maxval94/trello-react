import React, { Component } from "react";
import "./styles/index.scss";
import Logout from "./Components/Logout";
import Nav from "./Components/Nav";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
      </div>
    );
  }
}

export default App;
