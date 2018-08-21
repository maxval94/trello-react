import React, { Component } from "react";
import Card from "./Card";

class Column extends Component {
  render() {
    const { title, cards } = this.props;

    return (
      <div className="column">
        <h3 className="column__title">{title}</h3>
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    );
  }
}

export default Column;
