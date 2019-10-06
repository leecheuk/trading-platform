const isDev = require('electron-is-dev');
const util = {
    findSymbol(stocks, query) {
        return stocks.filter((stock) => stock.symbol.includes(query) || stock.name.includes(query));
    },
    isDev
}

export default util;