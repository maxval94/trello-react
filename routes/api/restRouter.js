const express = require("express");
const { restRouter: userRouter } = require("./user");
const { restRouter: boardRouter } = require("./board");
const apiErrorHandler = require("./modules/errorHandler");

const restRouter = express.Router();

restRouter.use("/user", userRouter);
restRouter.use("/board", boardRouter);
restRouter.use(apiErrorHandler);

module.exports = restRouter;
