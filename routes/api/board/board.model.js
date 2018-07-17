const mongoose = require("mongoose");

const schema = {};
const boardSchema = new mongoose.Schema(schema, { timestamps: true });

boardSchema.methods = {};

const Board = mongoose.model("board", boardSchema);

module.exports = {
  schema,
  Board
};
