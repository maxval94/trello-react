import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import NewCard from "./NewCard";
import DeleteColumn from "./DeleteColumn";

class Column extends Component {
  static defaultProps = {
    id: "",
    title: "",
    cards: [],
    onUpdate: () => {},
    onDelete: () => {}
  };

  handleAddCard = cards => {
    const { id, title, onUpdate } = this.props;

    onUpdate({
      id,
      title,
      cards
    });
  };

  handleDeleteCard = cardId => {
    const { id, title, cards, onUpdate } = this.props;

    onUpdate({
      id,
      title,
      cards: cards.filter(card => card.id !== cardId)
    });
  };

  render() {
    const { id, title, cards, onDelete } = this.props;

    return (
      <div className="column">
        <div className="column__head">
          <h3 className="column__title">{title}</h3>
          <DeleteColumn id={id} onDelete={onDelete} />
        </div>
        <Droppable droppableId={id}>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="column__card"
            >
              {cards.map((card, index) => (
                <Card
                  key={index}
                  index={index}
                  {...card}
                  onDelete={this.handleDeleteCard}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <NewCard id={id} onAdd={this.handleAddCard} />
      </div>
    );
  }
}

export default Column;
