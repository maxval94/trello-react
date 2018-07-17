const express = require("express");
const {
  findByParam,
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
} = require("./board.controller");

const boardRouter = express.Router();

boardRouter.param("id", findByParam);

boardRouter
  .route("/")
  .get(getAll)
  .post(createOne);

boardRouter
  .route("/:id")
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = boardRouter;
