import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import NewCard from "./NewCard";
import DeleteColumn from "./DeleteColumn";
import PromptCard from "./PromptCard";

class Column extends Component {
  static defaultProps = {
    id: "",
    index: 0,
    title: "",
    cards: [],
    onUpdate: () => {},
    onDelete: () => {}
  };

  state = {
    promptId: ""
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

  handleOpenPrompt = promptId => {
    this.setState({
      promptId
    });
  };

  handleClosePrompt = () => {
    this.setState({
      promptId: ""
    });
  };

  renderPrompt() {
    const { promptId } = this.state;

    return (
      <PromptCard
        id={promptId}
        boardId={this.props.boardId}
        onClose={this.handleClosePrompt}
      />
    );
  }

  render() {
    const { id, index, title, cards, onDelete } = this.props;
    const { promptId } = this.state;
    const hasPrompt = Boolean(promptId);

    return (
      <Draggable draggableId={id} index={index} isDragDisabled={hasPrompt}>
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
                      isDragDisabled={hasPrompt}
                      onDelete={this.handleDeleteCard}
                      onOpenPrompt={this.handleOpenPrompt}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {hasPrompt && this.renderPrompt()}
            <NewCard id={id} onAdd={this.handleAddCard} />
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
