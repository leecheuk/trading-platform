const util = {
    findSymbol(stocks, query) {
        return stocks.filter((stock) => stock.symbol.includes(query) || stock.name.includes(query));
    }
}

export default util;