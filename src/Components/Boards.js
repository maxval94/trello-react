import React, { Component } from "react";
import Column from "./Column";

class Boards extends Component {
  static defaultProps = {
    title: "",
    lists: []
  };

  render() {
    const { title, lists } = this.props;

    return (
      <div className="boards">
        <h2 className="boards__title">{title}</h2>
        <div className="boards__body">
          {lists.map((el, index) => (
            <Column key={index} {...el} />
          ))}
        </div>
      </div>
    );
  }
}

export default Boards;
