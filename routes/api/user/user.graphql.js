const { gql } = require("apollo-server-express");

const schema = gql`
  type User {
    id: ID!
    email: String!
    created: String!
    boards: [Board]!
  }

  input UpdateUser {
    email: String!
  }

  input CreateUser {
    email: String!
    password: String!
  }

  input Login {
    email: String!
    password: String!
  }

  type Logout {
    data: String!
  }
`;

module.exports = schema;
