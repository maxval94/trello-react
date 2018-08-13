const mongoose = require("../../../db");

const schema = {
  title: String,
  description: String,
  label: String
};
const cardSchema = new mongoose.Schema(schema, { timestamps: true });

cardSchema.methods = {};

const Card = mongoose.model("card", cardSchema);

module.exports = {
  schema,
  Card
};
