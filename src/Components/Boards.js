import React, { Component } from "react";
import { debounce } from "lodash";
import { removeAt, insert } from "timm";
import { Mutation, Query } from "react-apollo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { updateList, updateBoard } from "../Mutations";
import NewColumn from "./NewColumn";
import { getBoard } from "../Query";
import UsersLists from "./UsersLists";

const getIds = data => {
  return data.map(({ id }) => id);
};

const debounceFetch = debounce((fetch, data) => {
  fetch(data);
}, 2000);

class Boards extends Component {
  static defaultProps = {
    boardId: "",
    title: "",
    lists: []
  };

  state = this.props;

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  handleTitleChange = (value, fetch) => {
    const { boardId } = this.props;

    this.setState({
      title: value
    });

    debounceFetch(fetch, {
      variables: {
        input: {
          id: boardId,
          name: value
        }
      },
      update: cache => {
        const query = {
          query: getBoard,
          variables: {
            id: boardId
          }
        };
        const board = cache.readQuery(query).getBoard;

        cache.writeQuery({
          ...query,
          data: {
            getBoard: {
              ...board,
              name: value
            }
          }
        });
      }
    });
  };

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

  renderBoard() {
    return (
      <div className="board__title">
        <div className="board__title-name">
          <Mutation mutation={updateBoard}>
            {fetch => (
              <input
                type="text"
                placeholder="Board Title"
                value={this.state.title}
                onChange={e => {
                  this.handleTitleChange(e.target.value, fetch);
                }}
              />
            )}
          </Mutation>
        </div>
        <div className="board__title-users">
          <UsersLists boardId={this.props.boardId} />
        </div>
      </div>
    );
  }

  renderUsers({ users }) {
    return users.map((user, index) => {
      return (
        <div className="board__title-user" key={index}>
          {user.email}
        </div>
      );
    });
  }

  render() {
    const { boardId } = this.props;
    const { lists } = this.state;

    return (
      <div className="board">
        {this.renderBoard()}
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
                              boardId={boardId}
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
