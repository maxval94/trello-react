const { gql } = require("apollo-server-express");

const schema = gql`
  type List {
    id: ID!
    title: String!
    cards: [Card]!
  }

  input UpdateList {
    id: ID!
    title: String
    cards: [String]
  }
`;

module.exports = schema;
