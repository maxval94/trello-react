const { gql } = require("apollo-server-express");

const schema = gql`
  type Card {
    id: ID!
    title: String!
    description: String!
    label: String!
  }

  input AddCard {
    id: ID!
    title: String!
  }

  input UpdateCard {
    id: ID!
    title: String
    description: String
    label: String
  }
`;

module.exports = schema;
