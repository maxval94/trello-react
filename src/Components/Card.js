import React, { Component } from "react";
import classnames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { Mutation } from "react-apollo";
import Icon from "./Icon";
import { deleteCard } from "../Mutations";

class Card extends Component {
  static defaultProps = {
    id: "",
    title: "",
    description: "",
    label: "",
    isDragDisabled: false,
    onOpenPrompt: () => {}
  };

  getClassName = ({ isDragging }) => {
    return classnames("card", {
      "card--dragging": isDragging
    });
  };

  handlePrompOpen = () => {
    const { id, onOpenPrompt } = this.props;

    onOpenPrompt(id);
  };

  handleDelete = fetch => {
    fetch({
      variables: {
        input: {
          id: this.props.id
        }
      }
    });
  };

  handleUpdate = (cache, { data: { deleteCard } }) => {
    this.props.onDelete(deleteCard.id);
  };

  handleComplete = () => {
    console.log(`Card ${this.props.id} is deleted`);
  };

  handleError = err => {
    console.warn(`Card ${this.props.id} wasn't deleted`, err);
  };

  render() {
    const { id, index, title, isDragDisabled } = this.props;

    return (
      <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={this.getClassName(snapshot)}
            onClick={this.handlePrompOpen}
          >
            <h4 className="card__title">{title}</h4>
            <Mutation
              mutation={deleteCard}
              update={this.handleUpdate}
              onCompleted={this.handleComplete}
              onError={this.handleError}
            >
              {fetch => (
                <Icon
                  iconName="times"
                  onClick={() => {
                    this.handleDelete(fetch);
                  }}
                />
              )}
            </Mutation>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
