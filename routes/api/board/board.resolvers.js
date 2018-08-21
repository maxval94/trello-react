const merge = require("lodash.merge");
const Board = require("./board.model").Board;
const User = require("../user/user.model").User;
const Dashboard = require("../dashboard/dashboard.model").Dashboard;

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
      const Boards = await Dashboard.find({ boards: board._id });
      const usersData = await Promise.all(
        Boards.map(({ users }) => User.findById(users))
      );

      return usersData;
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
