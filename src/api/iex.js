import {URL_IEX} from '../config';

const iex = {
    getToken: function() {
        return process.env.REACT_APP_API_TOKEN;
    },
    getStockURL: function(symbol) {
        const token = process.env.REACT_APP_API_TOKEN;
        return `${URL_IEX}/stock/${symbol}/quote?token=${token}`;
    },
    // not available for free tier
    searchStockURL: function(query) {
        const token = process.env.REACT_APP_API_TOKEN;
        return `${URL_IEX}/search/${query}?token=${token}`;
    },
    getAllSymbolURL: function() {
        const token = process.env.REACT_APP_API_TOKEN;
        return `${URL_IEX}/ref-data/symbols?token=${token}`;
    },
    getAllSymbol: async function() {
        const url = this.getAllSymbolURL();
        const response = await fetch(url);
        return await response.json();
    }
}

export default iex;