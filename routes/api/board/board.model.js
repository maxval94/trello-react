const mongoose = require("../../../db");

const schema = {
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ]
};
const boardSchema = new mongoose.Schema(schema, { timestamps: true });

boardSchema.methods = {};

const Board = mongoose.model("board", boardSchema);

module.exports = {
  schema,
  Board
};
