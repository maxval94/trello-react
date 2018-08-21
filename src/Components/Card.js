import React, { Component } from "react";

class Card extends Component {
  static defaultProps = {
    id: "",
    title: "",
    description: "",
    label: ""
  };
  render() {
    const { title, description } = this.props;

    return (
      <div className="card">
        <h4 className="card__title">{title}</h4>
        <p className="card__description">{description}</p>
      </div>
    );
  }
}

export default Card;
