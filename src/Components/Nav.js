import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { getUser } from "../Query";

class Nav extends Component {
  renderBoards() {
    return (
      <div className="nav-board">
        <Link to="/">Board</Link>
      </div>
    );
  }

  renderUser() {
    return (
      <div className="nav-user">
        <span>
          <Query query={getUser}>
            {({ loading, error, data }) =>
              loading ? "loading ..." : data.getUser.email
            }
          </Query>
        </span>
        <Logout />
      </div>
    );
  }

  render() {
    return (
      <nav className="nav">
        {this.renderBoards()}
        {this.renderUser()}
      </nav>
    );
  }
}

export default Nav;
