import React, { Component } from "react";
import classnames from "classnames";
import { Query, Mutation } from "react-apollo";
import { getBoard } from "../Query";
import { addUser } from "../Mutations";
import Icon from "./Icon";

class UsersLists extends Component {
  static defaultProps = {
    boardId: ""
  };

  state = {
    isOpen: false,
    email: "",
    emailError: false
  };

  componentDidMount() {
    document.addEventListener("click", this.handleOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutside);
  }

  handleRef = node => {
    this.node = node;
  };

  handleOutside = e => {
    const isOutside = e.target.closest(`.${this.node.className}`);

    if (!isOutside) {
      this.setState({
        isOpen: false
      });
    }
  };

  handleOpenDropDown = () => {
    this.setState({
      isOpen: true
    });
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value,
      emailError: false
    });
  };

  handleAddNew = fetch => {
    const { email } = this.state;

    if (email.trim()) {
      fetch({
        variables: {
          input: {
            id: this.props.boardId,
            email
          }
        }
      });
    } else {
      this.setState({
        emailError: true
      });
    }
  };

  renderUsers({ users }) {
    return users.map((user, index) => {
      const name = user.email.split("@")[0];

      return (
        <div key={index} className="users__lists-item">
          {name}
        </div>
      );
    });
  }

  renderDropdown() {
    const { email, emailError } = this.state;
    const className = classnames("users__lists-new__user", {
      "users__lists-new__user--error": emailError
    });

    return (
      <div className={className}>
        <p>Add other member</p>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={this.handleEmailChange}
        />
        <Mutation mutation={addUser}>
          {fetch => (
            <button
              className="btn-solid"
              onClick={() => {
                this.handleAddNew(fetch);
              }}
            >
              Add
            </button>
          )}
        </Mutation>
      </div>
    );
  }

  render() {
    return (
      <div ref={this.handleRef} className="users__lists">
        <Query query={getBoard} variables={{ id: this.props.boardId }}>
          {({ loading, error, data }) =>
            loading ? "loading ..." : this.renderUsers(data.getBoard)
          }
        </Query>
        <div className="users__lists-new" onClick={this.handleOpenDropDown}>
          <div className="users__lists-new__action">
            <Icon iconName="ellipsis-v" />
          </div>
          {this.state.isOpen && this.renderDropdown()}
        </div>
      </div>
    );
  }
}

export default UsersLists;
