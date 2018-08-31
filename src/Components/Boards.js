import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { updateList } from "../Mutations";

class Boards extends Component {
  static defaultProps = {
    title: "",
    lists: []
  };

  state = this.props;

  handleDragEnd = (data, fetch) => {
    const { destination, source, draggableId } = data;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const { lists } = this.state;
    const list = lists.find(list => list.id === source.droppableId);

    // Create New Cards
    const card = list.cards.find(card => card.id === draggableId);
    const cards = [...list.cards];
    cards.splice(source.index, 1);
    cards.splice(destination.index, 0, card);
    const newCards = cards.map(card => card.id);

    // Fetch Data
    fetch({
      variables: {
        input: {
          id: source.droppableId,
          cards: newCards
        }
      }
    });

    // Update State
    const newList = Object.assign({}, list, { cards });
    const newLists = lists.map(
      ({ id }) => (id === source.droppableId ? newList : list)
    );

    this.setState({
      lists: newLists
    });
  };

  render() {
    const { title, refreshBoard } = this.props;
    const { lists } = this.state;

    return (
      <div className="boards">
        <h2 className="boards__title">{title}</h2>
        <div className="boards__body">
          <Mutation mutation={updateList}>
            {fetch => (
              <DragDropContext
                onDragEnd={data => {
                  this.handleDragEnd(data, fetch);
                }}
              >
                {lists.map((el, index) => (
                  <Column key={index} {...el} refreshBoard={refreshBoard} />
                ))}
              </DragDropContext>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Boards;
