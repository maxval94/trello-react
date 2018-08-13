const merge = require("lodash.merge");

const getList = (_, __, { list }) => {
  return {
    id: "sadasd",
    title: "List 1",
    cards: []
  };
};

const updateList = (_, { input }, { list }) => {
  merge(list, input);
  return list.save();
};

const userResolvers = {
  Query: {
    getList
  },
  List: {
    // get user who use that board
    cards: list => {
      // Query db and search all users who user that board

      return ["User 1", "User 2"];
    }
  },
  Mutation: {
    updateList
  }
};

module.exports = userResolvers;
