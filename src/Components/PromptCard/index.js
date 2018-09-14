import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Query } from "react-apollo";
import { getCard } from "../../Query";
import Modal from "./Modal";
import Icon from "../Icon";

class PromptCard extends Component {
  static defaultProps = {
    id: "",
    onClose: () => {}
  };

  handleDropClick = e => {
    const isOutSide = !e.target.closest(".prompt__content");

    if (isOutSide) {
      this.props.onClose();
    }
  };

  renderCard(card) {
    return <div>{card.title}</div>;
  }

  render() {
    return (
      <Modal>
        <div
          ref={this.handleRef}
          className="prompt"
          onClick={this.handleDropClick}
        >
          <div className="prompt__backdrop" />
          <div className="prompt__close">
            <Icon iconName="times" />
          </div>
          <div className="prompt__content">
            <div className="prompt__wrap">
              <Query query={getCard} variables={{ id: this.props.id }}>
                {({ loading, error, data }) =>
                  loading ? "loading ..." : this.renderCard(data.getCard)
                }
              </Query>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PromptCard;
