import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

class Boards extends Component {
  static defaultProps = {
    title: "",
    lists: []
  };

  state = this.props;

  handleDragEnd = data => {
    console.log("data", data);
  };

  render() {
    const { title, lists } = this.props;

    return (
      <div className="boards">
        <h2 className="boards__title">{title}</h2>
        <div className="boards__body">
          <DragDropContext onDragEnd={this.handleDragEnd}>
            {lists.map((el, index) => (
              <Column key={index} {...el} />
            ))}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default Boards;
