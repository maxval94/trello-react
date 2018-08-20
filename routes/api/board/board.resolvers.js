const merge = require("lodash.merge");
const Board = require("./board.model").Board;

const getBoard = async (_, { id }) => {
  return await Board.findById(id);
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
    users: async board => {
      const userData = await Board.findById(board._id)
        .populate("users")
        .exec();

      return userData.users;
    },
    lists: async board => {
      const listData = await Board.findById(board._id)
        .populate("lists")
        .exec();

      return listData.lists;
    }
  },
  Mutation: {
    updateBoard
  }
};

module.exports = userResolvers;
