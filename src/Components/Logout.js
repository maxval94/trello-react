import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import { logout } from "../Query";

class Logout extends Component {
  handleLogout = client => {
    client
      .query({
        query: logout
      })
      .then(() => {
        window.location.reload();
      });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <button
            className="btn-solid"
            onClick={() => {
              this.handleLogout(client);
            }}
          >
            Log Out
          </button>
        )}
      </ApolloConsumer>
    );
  }
}

export default Logout;
