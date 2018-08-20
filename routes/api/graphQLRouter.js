const merge = require("lodash.merge");
const { cardType, cardResolvers } = require("./card");
const { listType, listResolvers } = require("./list");
const { userType, userResolvers } = require("./user");
const { boardType, boardResolvers } = require("./board");
const { ApolloServer, gql } = require("apollo-server-express");

// root definitions fop GraphQL
const baseSchema = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    # User
    getUser: User!

    # Board
    getBoard(id: String!): Board!

    # Logout
    logout: Logout!

    # Card
    getCard: Card!

    # List
    getList: List!
  }

  type Mutation {
    # User
    createUser(input: CreateUser!): User!
    login(input: Login!): User!
    updateUser(input: UpdateUser!): User!

    # Board
    updateBoard(input: UpdateBoard!): Board!

    # Card
    updateCard(input: UpdateCard!): Card!

    # List
    updateList(input: UpdateList!): List!
  }
`;

const graphQLRouter = new ApolloServer({
  // all the graphql files
  typeDefs: [baseSchema, userType, boardType, listType, cardType],

  // all the resolvers
  resolvers: merge(
    {},
    userResolvers,
    boardResolvers,
    listResolvers,
    cardResolvers
  ),

  // Context
  context: ({ req }) => ({
    req,
    login: req.login.bind(req),
    logout: req.logout.bind(req),
    user: req.user
  })
});

module.exports = graphQLRouter;
