import React, { Component, Fragment } from "react";
import { debounce } from "lodash";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { getCard, getBoard } from "../../Query";
import { updateCard } from "../../Mutations";
import Modal from "./Modal";

const debounceFetch = debounce((fetch, data) => {
  fetch(data);
}, 2000);

class PromptCard extends Component {
  static defaultProps = {
    id: "",
    onClose: () => {}
  };

  state = {
    title: "",
    description: "",
    label: "",
    error: null
  };

  handleDropClick = e => {
    const isOutSide = !e.target.closest(".prompt__content");

    if (isOutSide) {
      this.props.onClose();
    }
  };

  handleChange = (value, type, fetch) => {
    const { id: cardId, boardId } = this.props;

    this.setState({
      [`${type}`]: value
    });

    debounceFetch(fetch, {
      variables: {
        input: {
          id: cardId,
          [`${type}`]: value
        }
      },
      update: cache => {
        if (type === "title") {
          return;
        }

        const query = {
          query: getCard,
          variables: {
            id: cardId
          }
        };
        const card = cache.readQuery(query).getCard;

        cache.writeQuery({
          ...query,
          data: {
            getCard: {
              ...card,
              [`${type}`]: value
            }
          }
        });
      },
      refetchQueries:
        type === "title"
          ? [
              {
                query: getBoard,
                variables: {
                  id: boardId
                }
              }
            ]
          : []
    });
  };

  handleError = err => {
    this.setState({
      error: err
    });
  };

  renderTitle(card) {
    const title = this.state.title || card.title;

    return (
      <Mutation
        mutation={updateCard}
        update={this.handleUpdate}
        onError={this.handleError}
      >
        {fetch => (
          <div className="prompt__card-title">
            <input
              type="text"
              value={title}
              placeholder="title"
              onChange={e => {
                this.handleChange(e.target.value, "title", fetch);
              }}
            />
          </div>
        )}
      </Mutation>
    );
  }

  renderDescription(card) {
    const description = this.state.description || card.description;

    return (
      <Mutation
        mutation={updateCard}
        update={this.handleUpdate}
        onError={this.handleError}
      >
        {fetch => (
          <div className="prompt__card-description">
            <textarea
              value={description}
              placeholder="Description"
              onChange={e => {
                this.handleChange(e.target.value, "description", fetch);
              }}
            />
          </div>
        )}
      </Mutation>
    );
  }

  renderCard(card) {
    const { label } = card;

    return (
      <Fragment>
        <div className="prompt__card-label">{label}</div>
        {this.renderTitle(card)}
        {this.renderDescription(card)}
      </Fragment>
    );
  }

  renderError() {
    return <div className="prompt__card--error">{this.state.error}</div>;
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
          <div className="prompt__content">
            <div className="prompt__wrap">
              {this.state.error && this.renderError()}
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
