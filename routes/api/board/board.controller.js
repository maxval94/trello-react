const generateControllers = require("../modules/query").generateControllers;
const Board = require("./board.model").Board;

module.exports = generateControllers(Board);
