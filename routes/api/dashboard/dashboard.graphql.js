const { gql } = require("apollo-server-express");

const schema = gql`
  type Dashboard {
    id: ID!
    boards: [Board]!
    users: [User]!
  }

  input UpdateDashboard {
    id: ID!
    # boards: [Board]!
    # users: [User]!
  }
`;

module.exports = schema;
