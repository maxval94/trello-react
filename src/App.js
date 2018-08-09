import React, { Component } from "react";
import "./styles/index.scss";
import Logout from "./Components/Logout";

class App extends Component {
  render() {
    return (
      <div>
        Hello from Trello <Logout />
      </div>
    );
  }
}

export default App;
