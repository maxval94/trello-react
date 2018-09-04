const Card = require("./card.model").Card;
const List = require("../list/list.model").List;

const getCard = async (_, { id }) => {
  const card = await Card.findById(id);

  return card || {};
};

const updateCard = (_, { input }) => {
  const { id, ...newData } = input;
  const options = {
    rawResult: true,
    new: true
  };

  return new Promise((resolve, reject) => {
    return Card.findOneAndUpdate({ _id: id }, newData, options, (err, card) => {
      if (err) {
        reject(err);
      } else {
        resolve(card.value);
      }
    });
  });
};

const deleteCard = (_, { input }) => {
  const { id } = input;

  return new Promise((resolve, reject) => {
    return Card.deleteOne({ _id: id }, (err, card) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          id
        });
      }
    });
  });
};

const userResolvers = {
  Query: {
    getCard
  },
  Mutation: {
    updateCard,
    deleteCard
  }
};

module.exports = userResolvers;
