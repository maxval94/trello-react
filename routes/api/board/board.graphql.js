const { gql } = require("apollo-server-express");

const schema = gql`
  type Board {
    id: ID!
    name: String!
    users: [User]!
    usersName: [String]!
    lists: [List]!
  }

  input UpdateBoard {
    id: ID!
    name: String
    lists: [String]
  }

  input AddList {
    id: ID!
    title: String!
  }
`;

module.exports = schema;
