const crypto = require("crypto");
const Board = require("./board.model").Board;
const User = require("../user/user.model").User;
const Dashboard = require("../dashboard/dashboard.model").Dashboard;
const Card = require("../card/card.model").Card;
const List = require("../list/list.model").List;
const Mail = require("../modules/mail");
const getBoard = async (_, { id }) => {
  return await Board.findById(id);
};

const updateBoard = (_, { input }) => {
  const { id, ...newData } = input;
  const options = {
    rawResult: true,
    new: true
  };

  return new Promise((resolve, reject) => {
    return Board.findOneAndUpdate(
      { _id: id },
      newData,
      options,
      (err, board) => {
        if (err) {
          reject(err);
        } else {
          resolve(board.value);
        }
      }
    );
  });
};

const addUser = async (_, { input }, { user: fromUser }) => {
  const { id, email } = input;
  const toUser = await User.findOne({ email });
  // const options = {
  //   rawResult: true,
  //   new: true
  // };
  const token = crypto
    .createHmac("sha256", "secret")
    .update("I love Dashboard")
    .digest("hex");

  // const newData = {
  //   invitedUsers: [
  //     {
  //       userId: user._id,
  //       token
  //     }
  //   ]
  // };

  // const board = await Board.findOneAndUpdate(
  //   { _id: id },
  //   newData,
  //   options,
  //   (err, board) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(board.value);
  //     }
  //   }
  // );

  console.log("user.id", toUser._id);
  const name = toUser.email;
  const message = `token ${token}`;
  const content = `name: ${name} \n token: ${token} \n message: ${message} `;

  const mail = {
    from: fromUser.email,
    to: toUser.email, //Change to email address that you want to receive messages on
    subject: "New Message from Contact Form",
    text: content
  };

  await Mail.sendMail(mail, (err, data) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("Success", data);
    }
  });

  console.log("board", board);

  return {
    name: "Message will be send"
  };
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

const boardResolvers = {
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
    addList,
    addUser
  }
};

module.exports = boardResolvers;
