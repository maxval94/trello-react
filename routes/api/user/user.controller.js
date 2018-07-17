const generateControllers = require("../modules/query").generateControllers;
const User = require("./user.model").User;

module.exports = generateControllers(User);
