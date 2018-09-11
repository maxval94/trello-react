import React, { Component } from "react";
import { removeAt, insert } from "timm";
import { Mutation } from "react-apollo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { updateList, updateBoard } from "../Mutations";
import NewColumn from "./NewColumn";

const getIds = data => {
  return data.map(({ id }) => id);
};

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
    const { destination, source, type } = data;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === "column") {
      this.handleDragBetweenColumn(data, fetch);
    } else {
      if (source.droppableId === destination.droppableId) {
        this.handleDragInCurrentColumn(data, fetch);
      } else {
        this.handleDragInDifferentColumn(data, fetch);
      }
    }
  };

  handleDragBetweenColumn = (data, fetch) => {
    const { destination, source, draggableId } = data;
    const { lists } = this.state;
    const list = lists.find(list => list.id === draggableId);
    const newLists = [...lists];
    newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, list);

    // Fetch Data
    fetch({
      variables: {
        input: {
          id: this.props.boardId,
          lists: getIds(newLists)
        }
      }
    });

    this.setState({
      lists: newLists
    });
  };

  handleDragInCurrentColumn = (data, fetch) => {
    const { destination, source, draggableId } = data;
    const { lists } = this.state;
    const list = lists.find(list => list.id === source.droppableId);
    const card = list.cards.find(card => card.id === draggableId);

    // Create New Cards
    const cards = [...list.cards];
    cards.splice(source.index, 1);
    cards.splice(destination.index, 0, card);

    // Fetch Data
    fetch({
      variables: {
        input: {
          id: source.droppableId,
          cards: getIds(cards)
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

  handleDragInDifferentColumn = (data, fetch) => {
    const { destination, source, draggableId } = data;
    const { lists } = this.state;
    const startList = lists.find(list => list.id === source.droppableId);
    const card = startList.cards.find(card => card.id === draggableId);
    const newStartList = Object.assign({}, startList, {
      cards: removeAt(startList.cards, source.index)
    });

    // Fetch Data for Start Column
    fetch({
      variables: {
        input: {
          id: source.droppableId,
          cards: getIds(removeAt(startList.cards, source.index))
        }
      }
    });

    const finishList = lists.find(list => list.id === destination.droppableId);
    const newFinishList = Object.assign({}, finishList, {
      cards: insert(finishList.cards, destination.index, card)
    });

    // Fetch Data for Finish Column
    fetch({
      variables: {
        input: {
          id: destination.droppableId,
          cards: getIds(insert(finishList.cards, destination.index, card))
        }
      }
    });

    const newLists = lists.map(list => {
      const { id } = list;

      if (id === source.droppableId) {
        return newStartList;
      } else if (id === destination.droppableId) {
        return newFinishList;
      }

      return list;
    });

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
          <Mutation mutation={updateBoard}>
            {fetchBoard => (
              <Mutation mutation={updateList}>
                {fetchList => (
                  <DragDropContext
                    onDragEnd={data => {
                      const fetch =
                        data.type === "column" ? fetchBoard : fetchList;
                      this.handleDragEnd(data, fetch);
                    }}
                  >
                    <Droppable
                      droppableId="all-columns"
                      direction="horizontal"
                      type="column"
                    >
                      {provided => (
                        <div ref={provided.innerRef} className="board__content">
                          {lists.map((el, index) => (
                            <Column
                              key={index}
                              index={index}
                              {...el}
                              onUpdate={this.handleUpdate}
                              onDelete={this.handleDeleteColumn}
                            />
                          ))}
                          {provided.placeholder}
                          <NewColumn
                            id={boardId}
                            onAdd={this.handleAddColumn}
                          />
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </Mutation>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Boards;
