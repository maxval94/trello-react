const Card = require("./card.model").Card;
const List = require("../list/list.model").List;

const getCard = async (_, { id }) => {
  const card = await Card.findById(id);

  return card || {};
};

const updateCard = (_, { input }) => {
  const { id, ...newData } = input;

  return new Promise((resolve, reject) => {
    return Card.findOneAndUpdate(
      { _id: id },
      newData,
      { rawResult: true },
      (err, card) => {
        if (err) {
          reject(err);
        } else {
          resolve(card.value);
        }
      }
    );
  });
};

const addCard = (_, { input }) => {
  const { id, title } = input;
  const card = new Card({
    title,
    description: "",
    label: ""
  });

  return new Promise((resolve, reject) => {
    const newData = {
      $push: { cards: card._id }
    };

    return List.findByIdAndUpdate(id, newData, (err, list) => {
      card.save(err => {
        if (err) reject(err);
      });

      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
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
