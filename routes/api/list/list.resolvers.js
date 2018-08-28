const merge = require("lodash.merge");
const List = require("./list.model").List;

const getList = async (_, { id }) => {
  const list = await List.findById(id);

  return list || {};
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
