const Dashboard = require("./dashboard.model").Dashboard;

const getDashboard = async (_, { id }) => {
  return await Dashboard.findById(id);
};

const updateDashboard = (_, { input }) => {
  const { id, ...newData } = input;
  const options = {
    rawResult: true,
    new: true
  };

  return new Promise((resolve, reject) => {
    return Dashboard.findOneAndUpdate(
      { _id: id },
      newData,
      options,
      (err, dashboard) => {
        if (err) {
          reject(err);
        } else {
          resolve(dashboard.value);
        }
      }
    );
  });
};

const dashboardResolvers = {
  Query: {
    getDashboard
  },
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

module.exports = dashboardResolvers;
