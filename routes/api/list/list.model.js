const mongoose = require("../../../db");

const schema = {
  title: String,
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card"
    }
  ]
};
const listSchema = new mongoose.Schema(schema, { timestamps: true });

listSchema.methods = {};

const List = mongoose.model("list", listSchema, "lists");

module.exports = {
  schema,
  List
};
