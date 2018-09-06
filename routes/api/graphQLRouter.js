const merge = require("lodash.merge");
const { dashboardType, dashboardResolvers } = require("./dashboard");
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
    getCard(id: String!): Card!

    # List
    getList(id: String!): List!
  }

  type Mutation {
    # Dashboard
    updateDashboard(input: UpdateDashboard!): Dashboard!

    # User
    createUser(input: CreateUser!): User!
    login(input: Login!): User!
    updateUser(input: UpdateUser!): User!

    # Board
    updateBoard(input: UpdateBoard!): Board!
    addList(input: AddList): Board!

    # Card
    updateCard(input: UpdateCard!): Card!
    deleteCard(input: DeleteCard!): Card!

    # List
    updateList(input: UpdateList!): List!
    deleteList(input: DeleteList): List!
    addCard(input: AddCard!): List!
  }
`;

const graphQLRouter = new ApolloServer({
  // all the graphql files
  typeDefs: [
    baseSchema,
    dashboardType,
    userType,
    boardType,
    listType,
    cardType
  ],

  // all the resolvers
  resolvers: merge(
    {},
    dashboardResolvers,
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
