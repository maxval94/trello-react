const express = require("express");
const {
  findByParam,
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
} = require("./user.controller");

const userRouter = express.Router();

userRouter.param("id", findByParam);

userRouter
  .route("/")
  .get(getAll)
  .post(createOne);

userRouter
  .route("/:id")
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = userRouter;
