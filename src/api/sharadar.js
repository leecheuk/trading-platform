import { URL_SHARADAR } from '../config';

// sample data from 2018-09-01 to 2018-12-31
const sharadar = {
    getToken: function () {
        return process.env.REACT_APP_QUANDL_API_KEY;
    },
    getStockURL: function (symbol) {
        const token = this.getToken();
        return `${URL_SHARADAR}/SEP.json?ticker=${symbol}&api_key=${token}`;
    },
    getAllSymbolURL: function () {
        const token = this.getToken();
        return `${URL_SHARADAR}/TICKERS?table=SEP&api_key=${token}`;
    },
    getAllSymbol: async function () {
        const url = this.getAllSymbolURL();
        const response = await fetch(url);
        return await response.json();
    }
}

export default sharadar;