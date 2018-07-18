const express = require("express");
const userRouter = require("./user");
const boardRouter = require("./board");
const apiErrorHandler = require("./modules/errorHandler");

const restRouter = express.Router();

restRouter.use("/user", userRouter);
restRouter.use("/board", boardRouter);
restRouter.use(apiErrorHandler);

module.exports = restRouter;
