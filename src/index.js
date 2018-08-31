import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./styles/index.scss";
import Config from "../config/config.json";
import { Home, Board } from "./Routes";
import Nav from "./Components/Nav";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "same-origin"
  },
  uri: Config.apolloClient.uri,
  clientState: {
    defaults: {
      email: "",
      boards: []
    }
  }
});

class App extends React.Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Nav />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/board" component={Board} />
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
