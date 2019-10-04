const stockSchema = `
    CREATE TABLE IF NOT EXISTS Stocks (
        id INTEGER NOT NULL PRIMARY KEY,
        date DATE DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        isFavourite BOOLEAN NOT NULL,
        inPortfolio BOOLEAN NOT NULL 
    );
`
module.exports = stockSchema;