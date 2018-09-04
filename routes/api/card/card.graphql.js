const { gql } = require("apollo-server-express");

const schema = gql`
  type Card {
    id: ID!
    title: String!
    description: String!
    label: String!
  }

  input UpdateCard {
    id: ID!
    title: String
    description: String
    label: String
  }

  input DeleteCard {
    id: ID!
  }
`;

module.exports = schema;
