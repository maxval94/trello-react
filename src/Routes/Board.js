import React, { Component } from "react";
import { Query } from "react-apollo";
import Boards from "../Components/Boards";
import { getBoard } from "../Query";

class Board extends Component {
  renderBoards(data) {
    return <Boards lists={data.lists} title={data.name} />;
  }

  render() {
    const boardId = this.props.location.pathname.split("/:")[1];

    return (
      <div className="page-board-body">
        <Query query={getBoard} variables={{ id: boardId }}>
          {({ loading, error, data }) =>
            loading ? "loading ..." : this.renderBoards(data.getBoard)
          }
        </Query>
      </div>
    );
  }
}

export default Board;
