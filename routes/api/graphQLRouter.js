const merge = require("lodash.merge");
const { userType, userResolvers } = require("./user").graphQLRouter;
const { boardType, boardResolvers } = require("./board").graphQLRouter;
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
    getBoard: Board!

    # Logout
    logout: Logout!
  }

  type Mutation {
    # User
    createUser(input: CreateUser!): User!
    login(input: Login!): User!
    updateUser(input: UpdatedUser!): User!

    # Board
    updateBoard(input: UpdatedBoard!): Board!
  }
`;

const graphQLRouter = new ApolloServer({
  // all the graphql files
  typeDefs: [baseSchema, userType, boardType],

  // all the resolvers
  resolvers: merge({}, userResolvers, boardResolvers),

  // Context
  context: ({ req }) => ({
    req,
    login: req.login.bind(req),
    logout: req.logout.bind(req),
    user: req.user,
    board: req.board
  })
});

module.exports = graphQLRouter;
