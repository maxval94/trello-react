import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Mutation } from "react-apollo";
import Config from "../config/config.json";
import { createUser, loginUser } from "./Mutations";
import "./styles/login.scss";

class Login extends React.Component {
  state = {
    type: "login",
    error: null,
    email: "",
    password: ""
  };

  handleChange(value, type) {
    this.setState({
      [`${type}`]: value
    });
  }

  handleComplete = () => {
    window.location.reload();
  };

  handleError = error => {
    this.setState({
      error: error.message
    });
  };

  handleLogin = () => {
    if (this.state.type !== "login") {
      this.setState({
        type: "login"
      });
    }
  };

  handleSignUp = () => {
    if (this.state.type !== "signUp") {
      this.setState({
        type: "signUp"
      });
    }
  };

  renderError(error) {
    return <div className="login__error">{error}</div>;
  }

  renderForms() {
    const { email, password, type } = this.state;
    const mutation = type === "login" ? loginUser : createUser;

    return (
      <Mutation
        mutation={mutation}
        onCompleted={this.handleComplete}
        onError={this.handleError}
      >
        {(fetch, { data }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!email.trim() || !password.trim()) {
                return;
              }

              fetch({ variables: { input: { email, password } } });
            }}
          >
            <div className="login__data">
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={e => {
                  this.handleChange(e.target.value, "email");
                }}
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={e => {
                  this.handleChange(e.target.value, "password");
                }}
              />
            </div>
            <div className="login__submit">
              <button type="submit" onClick={this.handleLogin}>
                Login
              </button>
              <button type="submit" onClick={this.handleSignUp}>
                Sign Up
              </button>
            </div>
          </form>
        )}
      </Mutation>
    );
  }

  render() {
    const { error } = this.state;

    return (
      <React.Fragment>
        <h1 className="login__title">Welcome</h1>
        {this.renderForms()}
        {error && this.renderError(error)}
      </React.Fragment>
    );
  }
}

const client = new ApolloClient({
  uri: Config.apolloClient.uri
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Login />
  </ApolloProvider>,
  document.getElementById("root")
);
