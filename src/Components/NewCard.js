import React, { Component } from "react";
import classnames from "classnames";

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

  handleAdd = () => {
    const { value } = this.state;

    if (value.trim()) {
      const { id } = this.props;
      console.log("new Card", id, value);
    } else {
      this.setState({
        emptyValue: true
      });
    }
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
      <div className="new-card__content">
        <textarea
          placeholder="Enter Title for this card"
          value={this.state.value}
          onChange={this.handleValueChange}
        />
        <button onClick={this.handleAdd}>Add Card</button>
      </div>
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
