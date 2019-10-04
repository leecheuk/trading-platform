const orderSchema = require("./order");
const stockSchema = require("./stock");
const userSchema = require("./user");

const dbSchema = orderSchema + '\n' +
    stockSchema + '\n' +
    userSchema;

module.exports = dbSchema;