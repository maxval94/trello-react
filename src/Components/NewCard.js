import React, { Component } from "react";
import classnames from "classnames";
import { Mutation } from "react-apollo";
import { addCard } from "../Mutations";

class AddNewCard extends Component {
  static defaultProps = {
    id: ""
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
    console.log("need Update State Application");
  };

  handleError = error => {
    console.warn(error);
  };

  renderNewContent() {
    return (
      <div className="new-card__title" onClick={this.handleOpen}>
        Add New Card
      </div>
    );
  }

  renderEditableContent() {
    return (
      <Mutation
        mutation={addCard}
        // update={(cache, { data: { addCard } }) => {
        //   const { boards } = cache.readQuery({ query: getBoard });

        //   // cache.writeQuery({
        //   //   query: getBoard,
        //   //   data: { boards }
        //   // });
        // }}
        onCompleted={this.handleComplete}
        onError={this.handleError}
      >
        {(fetch, { data }) => (
          <div className="new-card__content">
            <textarea
              placeholder="Enter Title for this card"
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
          </div>
        )}
      </Mutation>
    );
  }

  render() {
    const className = classnames("new-card", {
      "new-card--error": this.state.emptyValue
    });

    return (
      <div className={className}>
        {this.state.isOpen
          ? this.renderEditableContent()
          : this.renderNewContent()}
      </div>
    );
  }
}

export default AddNewCard;
