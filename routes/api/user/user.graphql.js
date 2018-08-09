const { gql } = require("apollo-server-express");

const schema = gql`
  type User {
    id: ID!
    email: String!
    created: String!
  }

  input UpdatedUser {
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
