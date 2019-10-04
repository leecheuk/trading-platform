const util = {
    findSymbol(stocks, query) {
        return stocks.filter((stock) => stock.symbol.includes(query) || stock.name.includes(query));
    },
    isDev() {
        return process.env.NODE_ENV == "development";
    }
}

export default util;