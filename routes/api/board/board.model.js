const mongoose = require("../../../db");

const schema = {
  name: String,
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "list"
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  invitedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      token: String
    }
  ]
};
const boardSchema = new mongoose.Schema(schema, { timestamps: true });

boardSchema.methods = {};

const Board = mongoose.model("board", boardSchema, "boards");

module.exports = {
  schema,
  Board
};
