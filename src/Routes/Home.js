import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { getUser } from "../Query";

class Home extends Component {
  renderBoard({ boards }) {
    return boards.map((board, index) => {
      return (
        <div key={index} className="page-board">
          <Link to={`/board/:${board.id}`}>{board.name}</Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="home-body">
        <h1 className="home-title">Boards</h1>
        <div className="page-boards">
          <Query query={getUser}>
            {({ loading, error, data }) =>
              loading ? "loading ..." : this.renderBoard(data.getUser)
            }
          </Query>
        </div>
      </div>
    );
  }
}

export default Home;
