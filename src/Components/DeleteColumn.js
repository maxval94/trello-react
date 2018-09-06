import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Icon from "./Icon";
import { deleteList } from "../Mutations";

class DeleteColumn extends Component {
  static defaultProps = {
    id: "",
    onDelete: () => {}
  };

  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
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

  handleUpdate = (cache, { data: { deleteList } }) => {
    this.props.onDelete(deleteList.id);
  };

  handleError = err => {
    console.warn(`List ${this.props.id} wasn't deleted`, err);
  };

  renderDropdown() {
    return (
      <div className="delete-column__dropdown">
        <Mutation
          mutation={deleteList}
          update={this.handleUpdate}
          onError={this.handleError}
        >
          {fetch => (
            <div
              className="delete-column__dropdown-item"
              onClick={() => {
                this.handleDelete(fetch);
              }}
            >
              <Icon iconName="trash" />
              Delete
            </div>
          )}
        </Mutation>
      </div>
    );
  }

  render() {
    return (
      <div className="delete-column" onClick={this.handleOpen}>
        <Icon iconName="ellipsis-v" />
        {this.state.isOpen && this.renderDropdown()}
      </div>
    );
  }
}

export default DeleteColumn;
