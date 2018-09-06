const List = require("./list.model").List;
const Card = require("../card/card.model").Card;

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

const deleteList = (_, { input }) => {
  const { id } = input;

  return new Promise((resolve, reject) => {
    return List.deleteOne({ _id: id }, err => {
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

const addCard = (_, { input }) => {
  const { id, title } = input;
  const card = new Card({
    title,
    description: "",
    label: ""
  });

  return new Promise((resolve, reject) => {
    const newData = {
      $push: {
        cards: card._id
      }
    };
    const options = {
      new: true
    };

    return List.findByIdAndUpdate(id, newData, options, (err, list) => {
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
    updateList,
    addCard,
    deleteList
  }
};

module.exports = userResolvers;
