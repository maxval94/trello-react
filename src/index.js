import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import Config from "../config/config.json";
import App from "./app";

const client = new ApolloClient({
  link: createHttpLink({
    uri: Config.apolloClient.uri,
    credentials: "same-origin"
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
