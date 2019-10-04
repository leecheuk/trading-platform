const dbSchema = require('../models');

const database = () => {
    const sqlite3 = require('sqlite3');

    let db = new sqlite3.Database('./db/app.db', (err) => {
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
            });
        });
    });
    
    const ret = {
        initializeUser: (transaction_fee=7, initial_balance=10000, api_key=null) => {
            var sql = "INSERT INTO Users (transaction_fee, initial_balance, api_key) " + 
                "VALUES (?, ?, ?)";
            db.run(sql, [transaction_fee, initial_balance, api_key],  (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(this.changes);
            })
        },
        updateAPI: (api_key) => {
            var sql = "UPDATE Users SET api_key = ? WHERE ID = (SELECT MAX(ID) FROM Users)";
            db.run(sql, api_key, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(this.changes);
            })
        },
        getUser: (callback) => {
            var sql = "SELECT * FROM Users WHERE ID = (SELECT MAX(ID) FROM Users)";
            db.get(sql, (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
            })
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
            ret._hasStock(stock, (row) => {
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
        _hasStock: (stock, callback) => {
            var { name, symbol, isFavourite } = stock;
            var sql = "SELECT * FROM Stocks WHERE symbol = ?";

            db.get(sql, symbol, (err, row) => {
                if (err) {
                    console.log(err);
                }
                callback(row);
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
        }
    }
    return ret;
}


module.exports = database;