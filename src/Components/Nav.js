import React, { Component } from "react";
import { Query } from "react-apollo";
import { getUser } from "../Query";

class Nav extends Component {
  renderBoards() {
    return <div className="nav-board">Board</div>;
  }

  renderUser() {
    return (
      <div className="nav-user">
        <Query query={getUser}>
          {({ loading, error, data }) =>
            loading ? "loading ..." : data.getUser.email
          }
        </Query>
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
