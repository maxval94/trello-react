const merge = require("lodash.merge");
const User = require("./user.model").User;
const Board = require("../board/board.model").Board;
const List = require("../list/list.model").List;
const Card = require("../card/card.model").Card;
const Dashboard = require("../dashboard/dashboard.model").Dashboard;

const createUser = (_, { input }, { login }) => {
  const { email, password } = input;
  const user = new User({
    email
  });
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
  const dashboard = new Dashboard({
    boards: board._id,
    users: user._id
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
  dashboard.save(err => {
    if (err) reject(err);
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
      const Users = await Dashboard.find({ users: user._id });
      const boardsData = await Promise.all(
        Users.map(({ boards }) => Board.findById(boards))
      );

      return boardsData;
    }
  },
  Mutation: {
    createUser,
    login,
    updateUser
  }
};

module.exports = userResolvers;
