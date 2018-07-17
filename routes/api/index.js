const express = require("express");
const userRouter = require("./user");
const boardRouter = require("./board");

const restRouter = express.Router();

restRouter.use("/user", userRouter);
restRouter.use("/board", boardRouter);

module.exports = restRouter;
