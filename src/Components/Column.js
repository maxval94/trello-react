import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import NewCard from "./NewCard";
import DeleteColumn from "./DeleteColumn";

class Column extends Component {
  static defaultProps = {
    id: "",
    index: 0,
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
    const { id, index, title, cards, onDelete } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="column"
          >
            <div className="column__head">
              <h3 className="column__title">{title}</h3>
              <DeleteColumn id={id} onDelete={onDelete} />
            </div>
            <Droppable droppableId={id} type="card">
              {provided => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column__cards"
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
        )}
      </Draggable>
    );
  }
}

export default Column;
