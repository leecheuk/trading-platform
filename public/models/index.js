const orderSchema = require("./order");
const stockSchema = require("./stock");
const userSchema = require("./user");
const portfolioSchema = require("./portfolio");

const dbSchema = orderSchema + '\n' +
    stockSchema + '\n' +
    userSchema + '\n' +
    portfolioSchema;

module.exports = dbSchema;