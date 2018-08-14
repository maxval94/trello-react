const merge = require("lodash.merge");
const User = require("./user.model").User;
const Board = require("../board/board.model").Board;
const List = require("../list/list.model").List;
const Card = require("../card/card.model").Card;

const createUser = (_, { input }, { login }) => {
  const { email, password } = input;
  const card = new Card({
    title: "Welcome to Trello",
    description: "",
    label: ""
  });
  const list = new List({
    title: "Basics",
    cards: card._id
  });
  const board = new Board({
    name: "Welcome Board",
    lists: list._id
  });

  card.save(err => {
    if (err) reject(err);
  });
  list.save(err => {
    if (err) reject(err);
  });
  board.save(err => {
    if (err) reject(err);
  });

  const user = new User({
    email,
    boards: board._id
  });

  return new Promise((resolve, reject) => {
    return User.register(user, password, err => {
      if (err) {
        reject(err);
      } else {
        login(user, () => resolve(user));
      }
    });
  });
};

const login = (_, { input }, { login }) => {
  const { email, password } = input;

  return new Promise((resolve, reject) => {
    return User.authenticate()(email, password, (err, user) => {
      if (user) {
        login(user, () => resolve(user));
      } else {
        reject("Email / Password Incorrect");
      }
    });
  });
};

const logout = (_, __, { logout }) => {
  logout();

  return { data: "Success" };
};

const getUser = (_, __, { user }) => {
  return user;
};

const updateUser = (_, { input }, { user }) => {
  merge(user, input);
  return user.save();
};

const userResolvers = {
  Query: {
    getUser,
    logout
  },
  User: {
    boards: async user => {
      const boardData = await User.findById(user._id)
        .populate("boards")
        .exec();

      return boardData.boards;
    }
  },
  Mutation: {
    createUser,
    login,
    updateUser
  }
};

module.exports = userResolvers;
