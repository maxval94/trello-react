import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import NewCard from "./NewCard";

class Column extends Component {
  render() {
    const { id, title, cards } = this.props;

    return (
      <div className="column">
        <h3 className="column__title">{title}</h3>
        <Droppable droppableId={id}>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="column__card"
            >
              {cards.map((card, index) => (
                <Card key={index} index={index} {...card} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <NewCard id={id} />
      </div>
    );
  }
}

export default Column;
