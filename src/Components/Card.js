import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

class Card extends Component {
  static defaultProps = {
    id: "",
    title: "",
    description: "",
    label: ""
  };

  render() {
    const { id, index, title, description } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card"
          >
            <h4 className="card__title">{title}</h4>
            <p className="card__description">{description}</p>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
