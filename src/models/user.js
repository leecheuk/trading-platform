const userSchema = `
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER NOT NULL PRIMARY KEY,
        transaction_fee REAL NOT NULL,
        balance REAL NOT NULL,
        api_key INTEGER
    );
`
module.exports = userSchema;