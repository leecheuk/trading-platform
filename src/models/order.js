const orderSchema = `
    CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER NOT NULL PRIMARY KEY,
        type TEXT NOT NULL,
        stock_id INTEGER NOT NULL UNIQUE,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        transaction_fee NOT NULL,
            FOREIGN KEY (stock_id) REFERENCES Stocks(id)
    );
`
module.exports = orderSchema;