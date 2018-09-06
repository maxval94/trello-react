import React, { Component } from "react";
import classnames from "classnames";
import { Mutation } from "react-apollo";
import Icon from "./Icon";
import { addList } from "../Mutations";

class AddNewColumn extends Component {
  static defaultProps = {
    id: "",
    onAdd: () => {}
  };

  state = {
    isOpen: false,
    emptyValue: false,
    value: ""
  };

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleValueChange = e => {
    this.setState({
      value: e.target.value,
      emptyValue: false
    });
  };

  handleUpdate = (cache, { data: { addList } }) => {
    this.props.onAdd(addList.lists);
  };

  handleAdd = fetch => {
    const { value } = this.state;

    if (value.trim()) {
      const { id } = this.props;

      fetch({
        variables: {
          input: {
            id,
            title: value
          }
        }
      });
    } else {
      this.setState({
        emptyValue: true
      });
    }
  };

  handleComplete = () => {
    this.setState({
      isOpen: false,
      value: ""
    });
  };

  handleError = error => {
    console.warn(error);
  };

  renderNewContent() {
    return (
      <div className="new-column__title" onClick={this.handleOpen}>
        Add New Lists
      </div>
    );
  }

  renderEditableContent() {
    return (
      <Mutation
        mutation={addList}
        update={this.handleUpdate}
        onCompleted={this.handleComplete}
        onError={this.handleError}
      >
        {(fetch, { data }) => (
          <div className="new-column__content">
            <input
              type="text"
              placeholder="Enter Title for this Lists"
              value={this.state.value}
              onChange={this.handleValueChange}
            />
            <button
              onClick={() => {
                this.handleAdd(fetch);
              }}
            >
              Add Card
            </button>
            <Icon iconName="times" onClick={this.handleComplete} />
          </div>
        )}
      </Mutation>
    );
  }

  render() {
    const { isOpen, emptyValue } = this.state;
    const className = classnames("column", "new-column", {
      "new-column--opened": isOpen,
      "new-column--error": emptyValue
    });

    return (
      <div className={className}>
        {isOpen ? this.renderEditableContent() : this.renderNewContent()}
      </div>
    );
  }
}

export default AddNewColumn;
