import React, { Component } from "react";
import { Query } from "react-apollo";
import Boards from "../Components/Boards";
import { getBoard } from "../Query";

class Board extends Component {
  getBoardId = () => {
    return this.props.location.pathname.split("/:")[1];
  };

  renderBoards(data) {
    return <Boards lists={data.lists} title={data.name} />;
  }

  render() {
    const boardId = this.getBoardId();

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
