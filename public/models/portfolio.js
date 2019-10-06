const portfolioSchema = `
    CREATE TABLE IF NOT EXISTS Portfolio (
        id INTEGER NOT NULL PRIMARY KEY,
        stock_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        entry_price REAL NOT NULL,
            FOREIGN KEY (stock_id) REFERENCES Stocks(id)
    );
`;

module.exports = portfolioSchema;