import React, { Component } from "react";
import { Query } from "react-apollo";
import { getBoard } from "../Query";

class Board extends Component {
  renderHeader(data) {
    return <div className="board-title">{data.name}</div>;
  }

  render() {
    const boardId = this.props.location.pathname.split("/:")[1];

    return (
      <div className="board-body">
        <Query query={getBoard} variables={{ id: boardId }}>
          {({ loading, error, data }) =>
            loading ? "loading ..." : this.renderHeader(data.getBoard)
          }
        </Query>
      </div>
    );
  }
}

export default Board;
