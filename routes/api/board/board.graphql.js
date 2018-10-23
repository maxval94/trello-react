const { gql } = require("apollo-server-express");

const schema = gql`
  type Board {
    id: ID!
    name: String!
    users: [User]!
    lists: [List]!
  }

  input UpdateBoard {
    id: ID!
    name: String
    lists: [String]
    users: [String]
    invitedUsers: [String]
  }

  input AddList {
    id: ID!
    title: String!
  }

  input AddUser {
    id: ID!
    email: String!
  }
`;

module.exports = schema;
