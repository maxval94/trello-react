const merge = require("lodash.merge");
const Dashboard = require("./dashboard.model").Dashboard;

// const getBoard = async (_, { id }) => {
//   return await Dashboard.findById(id);
// };

const updateDashboard = (_, { input }, { dashboard }) => {
  merge(dashboard, input);
  return dashboard.save();
};

const userResolvers = {
  // Query: {
  //   getBoard
  // },
  // Board: {
  //   users: async board => {
  //     const userData = await Dashboard.findById(board._id)
  //       .populate("users")
  //       .exec();
  //     return userData.users;
  //   },
  //   lists: async board => {
  //     const listData = await Dashboard.findById(board._id)
  //       .populate("lists")
  //       .exec();
  //     return listData.lists;
  //   }
  // },
  Mutation: {
    updateDashboard
  }
};

module.exports = userResolvers;
