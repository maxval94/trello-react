import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { updateList } from "../Mutations";
import NewColumn from "./NewColumn";

class Boards extends Component {
  static defaultProps = {
    boardId: "",
    title: "",
    lists: []
  };

  state = this.props;

  handleUpdate = newList => {
    const { lists } = this.state;
    const newLists = lists.map(
      list => (list.id === newList.id ? newList : list)
    );

    this.setState({
      lists: newLists
    });
  };

  handleAddColumn = newLists => {
    this.setState({
      lists: newLists
    });
  };

  handleDeleteColumn = listId => {
    const { lists } = this.state;
    const newLists = lists.filter(list => list.id !== listId);

    this.setState({
      lists: newLists
    });
  };

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
      list => (list.id === source.droppableId ? newList : list)
    );

    this.setState({
      lists: newLists
    });
  };

  render() {
    const { title, boardId } = this.props;
    const { lists } = this.state;

    return (
      <div className="board">
        <h2 className="board__title">{title}</h2>
        <div className="board__body">
          <div className="board__content">
            <Mutation mutation={updateList}>
              {fetch => (
                <DragDropContext
                  onDragEnd={data => {
                    this.handleDragEnd(data, fetch);
                  }}
                >
                  {lists.map((el, index) => (
                    <Column
                      key={index}
                      {...el}
                      onUpdate={this.handleUpdate}
                      onDelete={this.handleDeleteColumn}
                    />
                  ))}
                </DragDropContext>
              )}
            </Mutation>
            <NewColumn id={boardId} onAdd={this.handleAddColumn} />
          </div>
        </div>
      </div>
    );
  }
}

export default Boards;
