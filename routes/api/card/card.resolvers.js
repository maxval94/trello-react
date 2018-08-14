const merge = require("lodash.merge");

const getCard = (_, __, { card }) => {
  return card;
};

const updateCard = (_, { input }, { card }) => {
  merge(card, input);
  return card.save();
};

const userResolvers = {
  Query: {
    getCard
  },
  Mutation: {
    updateCard
  }
};

module.exports = userResolvers;
