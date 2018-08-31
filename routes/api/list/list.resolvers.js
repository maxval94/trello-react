const List = require("./list.model").List;

const getList = async (_, { id }) => {
  const list = await List.findById(id);

  return list || {};
};

const updateList = (_, { input }) => {
  const { id, ...newData } = input;
  const options = {
    rawResult: true,
    new: true
  };

  return new Promise((resolve, reject) => {
    return List.findOneAndUpdate({ _id: id }, newData, options, (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list.value);
      }
    });
  });
};

const userResolvers = {
  Query: {
    getList
  },
  List: {
    cards: async list => {
      const cardData = await List.findById(list._id)
        .populate("cards")
        .exec();

      return cardData.cards;
    }
  },
  Mutation: {
    updateList
  }
};

module.exports = userResolvers;
