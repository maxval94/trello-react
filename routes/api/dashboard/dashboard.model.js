const mongoose = require("../../../db");

const schema = {
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board"
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ]
};
const dashboardSchema = new mongoose.Schema(schema, { timestamps: true });

dashboardSchema.methods = {};

const Dashboard = mongoose.model("dashboard", dashboardSchema);

module.exports = {
  schema,
  Dashboard
};
