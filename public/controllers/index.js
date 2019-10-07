const dbSchema = require('../models');
const isDev = require('electron-is-dev');
const remote = require('electron');
const path = require('path');
const app = remote.app;

const database = () => {
    const sqlite3 = require('sqlite3');
    let dbPath = isDev ? path.resolve(__dirname + '/../db/', 'app.db') : app.getPath('userData') + '/app.db';
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Connected to the app.db SQlite database.');

        db.exec('PRAGMA foreign_keys = ON;', (err) => {
            if (err) {
                console.log(err);
            }
            db.exec(dbSchema, (err) => {
                if (err) {
                    console.log(err);
                }
                ret.getUser((row) => {
                    if (!row) {
                        ret.initializeUser();
                    }
                });
            });
        });
    });
    
    const ret = {
        close: (callback) => {
            db.close((err) => {
                if (err) {
                    console.log(err)
                }
                callback();
            })
        },
        initializeUser: (transaction_fee=7, balance=10000, api_key=null) => {
            var sql = "INSERT INTO Users (transaction_fee, balance, api_key) " + 
                "VALUES (?, ?, ?)";
            db.run(sql, [transaction_fee, balance, api_key],  (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(this.changes);
            });
        },
        updateAPI: (api_key) => {
            var sql = "UPDATE Users SET api_key = ? WHERE ID = (SELECT MAX(ID) FROM Users)";
            db.run(sql, api_key, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(this.changes);
            });
        },
        getUser: (callback) => {
            var sql = "SELECT * FROM Users WHERE ID = (SELECT MAX(ID) FROM Users)";
            db.get(sql, (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            });
        },
        getAPI: (callback) => {
            var sql = "SELECT api_key FROM Users WHERE ID = (SELECT MAX(ID) FROM Users)";
            db.get(sql, (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row["api_key"]);
            });
        },
        favouriteStock: (stock, callback) => {
            var {name, symbol, isFavourite} = stock;
            ret._getStock(stock, (row) => {
                if (!row) {
                    var sql = "INSERT INTO Stocks (name, symbol, isFavourite, inPortfolio) VALUES (?, ?, ?, ?)";
                    db.run(sql, [name, symbol, isFavourite, false], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        ret.getFavourites(callback);
                    });
                } else {
                    var sql = "UPDATE Stocks SET isFavourite = ? WHERE symbol = ?";
                    db.run(sql, [isFavourite, symbol], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        ret.getFavourites(callback);
                    });
                }
            });
        },
        _getStock: (stock, callback) => {
            var { name, symbol, isFavourite } = stock;
            var sql = "SELECT * FROM Stocks WHERE symbol = ?";

            db.get(sql, symbol, (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            });
        },
        _addStock: (stock, callback) => {
            var { name, symbol } = stock;
            var sql = "INSERT INTO Stocks (name, symbol, isFavourite, inPortfolio) VALUES (?, ?, ?, ?)";

            db.run(sql, [name, symbol, false, true], (err) => {
                if (err) {
                    console.log(err);
                }
                ret._getStock(stock, (row) => {
                    if (row && row.id) {
                        callback(row.id);
                    } else {
                        callback();
                    }
                });
            });
        },
        _updatePortfolio: (stockId, stock, callback) => {
            // search if stock is in portfolio
            var { symbol, quantity, price, portfolio_id, type } = stock;
            switch (type) {
                case "purchase":
                    // insert new record for every new purchase since entry price might be different
                    sql = "INSERT INTO Portfolio (stock_id, quantity, entry_price) VALUES (?, ?, ?)";
                    db.run(sql, [stockId, quantity, price], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        callback();
                    })
                    break;
                case "sell":
                    console.log('selling')
                    // update record with the same entry price 
                    sql = "UPDATE Portfolio SET quantity = quantity - ? WHERE id = ?";
                    db.run(sql, [quantity, portfolio_id], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        callback();
                    })
                    break;
                default:
                    callback();
                    break;
            }
        },
        _addPortfolioStock: (stock, callback) => {
            var { symbol } = stock;
            var sql = "UPDATE Stocks SET inPortfolio = true WHERE symbol = ?";
            db.run(sql, [symbol], (err) => {
                if (err) {
                    console.log(err);
                }
                ret._getStock(stock, (row) => {
                    callback(row.id);
                });
            });
        },
        _removePortfolioStock: (stock, callback) => {
            var { symbol } = stock;
            var sql = "UPDATE Stocks SET inPortfolio = false WHERE symbol = ?";
            db.run(sql, [symbol], (err) => {
                if (err) {
                    console.log(err);
                }
                ret._getStock(stock, (row) => {
                    callback(row.id);
                });
            });
        },
        _updateBalance: (balance, callback) => {
            var sql = "UPDATE Users SET balance = ? WHERE ID = (SELECT MAX(ID) FROM Users)";
            // var balance = userBalance - stock.price*stock.quantity - stock.transaction_fee;
            db.run(sql, [balance], (err) => {
                if (err) {
                    console.log(err);
                }
                callback();
            });
        },
        getFavourites: (callback) => {
            var sql = "SELECT * FROM Stocks WHERE isFavourite = true";
            db.all(sql, (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            });
        },
        purchaseOrder: (stock, callback) => {
            // check balance
            ret.getUser((row) => {
                if (row.balance >= stock.price*stock.quantity + stock.transaction_fee) {
                    var balance = row.balance - stock.price * stock.quantity - stock.transaction_fee;
                    // update balance
                    ret._updateBalance(balance, () => {
                            // check if stock is in db already
                            ret._getStock(stock, (s) => {
                                const { type, price, quantity, transaction_fee } = stock;
                                var sql = "INSERT INTO Orders (type, stock_id, price, quantity, transaction_fee) VALUES (?, ?, ?, ?, ?)";
                                if (s) {
                                    // update stock
                                    ret._addPortfolioStock(stock, (stockId) => {
                                        ret._updatePortfolio(stockId, stock, () => {
                                            db.run(sql, [type, stockId, price, quantity, transaction_fee], (err) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                callback("success");
                                            });
                                        });
                                    });
                                } else {
                                    // create stock
                                    ret._addStock(stock, (stockId) => {
                                        ret._updatePortfolio(stockId, stock, () => {
                                            db.run(sql, [type, stockId, price, quantity, transaction_fee], (err) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                callback("success");
                                            });
                                        });
                                    });
                                }
                            });
                    });
                } else {
                    callback();
                }
            });
        },
        sellOrder: (stock, callback) => {
            // check quantity from portfolio_id 
            var sql = "SELECT * FROM Portfolio WHERE id = ?";
            db.get(sql, [stock.portfolio_id], (err, row) => {
                if (err) {
                    console.log(err);
                }
                ret.getUser((user) => {
                    if (row.quantity >= stock.quantity) {
                        // update balance
                        var balance = user.balance + stock.price * stock.quantity - stock.transaction_fee;
                        ret._updateBalance(balance, () => {
                            // remove stock from portfolio
                            ret._removePortfolioStock(stock, (stockId) => {
                                ret._updatePortfolio(stockId, stock, () => {
                                    const { type, price, quantity, transaction_fee } = stock;
                                    var sql = "INSERT INTO Orders (type, stock_id, price, quantity, transaction_fee) VALUES (?, ?, ?, ?, ?)";
                                    db.run(sql, [type, stockId, price, quantity, transaction_fee], (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        callback();
                                    });
                                });
                            });
                        });
                    } else {
                        callback();
                    }
                })
            });
        },
        getPortfolio: (callback) => {
            var sql = "SELECT *, Portfolio.id AS portfolio_id FROM Stocks INNER JOIN Portfolio ON Stocks.id = Portfolio.stock_id";
            db.all(sql, [], (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            });
        },
        getPortfolioStock: (portfolio_id, callback) => {
            var sql = "SELECT * FROM Portfolio WHERE id = ?";
            db.get(sql, [portfolio_id], (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            });
        },
        getOrders: (callback) => {
            var sql = "SELECT * FROM Orders INNER JOIN Stocks ON Orders.stock_id = Stocks.id";
            db.all(sql, [], (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            });
        }
    }
    return ret;
}


module.exports = database;