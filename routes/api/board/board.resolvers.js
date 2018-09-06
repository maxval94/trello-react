const merge = require("lodash.merge");
const Board = require("./board.model").Board;
const User = require("../user/user.model").User;
const Dashboard = require("../dashboard/dashboard.model").Dashboard;
const Card = require("../card/card.model").Card;
const List = require("../list/list.model").List;

const getBoard = async (_, { id }) => {
  return await Board.findById(id);
};

const updateBoard = (_, { input }, { board }) => {
  merge(board, input);
  return board.save();
};

const addList = (_, { input }) => {
  const { id, title } = input;
  const card = new Card({
    title: "Welcome to Dashboard",
    description: "",
    label: ""
  });
  const list = new List({
    title,
    cards: card._id
  });

  return new Promise((resolve, reject) => {
    const newData = {
      $push: {
        lists: list._id
      }
    };
    const options = {
      new: true
    };

    return Board.findByIdAndUpdate(id, newData, options, (err, board) => {
      card.save(err => {
        if (err) reject(err);
      });
      list.save(err => {
        if (err) reject(err);
      });

      if (err) {
        reject(err);
      } else {
        resolve(board);
      }
    });
  });
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
    updateBoard,
    addList
  }
};

module.exports = userResolvers;
