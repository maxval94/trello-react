const merge = require("lodash.merge");

const getBoard = (_, __, { board }) => {
  return {
    id: "sadasd",
    name: "board 1"
  };
};

const updateBoard = (_, { input }, { board }) => {
  merge(board, input);
  return board.save();
};

const userResolvers = {
  Query: {
    getBoard
  },
  Board: {
    // get user who use that board
    usersName: user => {
      // Query db and search all users who user that board

      return ["User 1", "User 2"];
    }
  },
  Mutation: {
    updateBoard
  }
};

module.exports = userResolvers;
