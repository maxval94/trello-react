const merge = require("lodash.merge");
const Card = require("./card.model").Card;
const List = require("../list/list.model").List;

const getCard = (_, __, { card }) => {
  return card;
};

const updateCard = (_, { input }, { card }) => {
  merge(card, input);
  return card.save();
};

const addCard = (_, { input }) => {
  const { id, title } = input;
  const card = new Card({ title });

  return new Promise((resolve, reject) => {
    return List.findByIdAndUpdate(
      id,
      { $push: { items: card._id } },
      (err, list) => {
        if (err) {
          reject(err);
        } else {
          resolve(list);
        }
      }
    );
  });
};

const userResolvers = {
  Query: {
    getCard
  },
  Mutation: {
    addCard,
    updateCard
  }
};

module.exports = userResolvers;
