import { URL_ALPHA } from '../config';

// sample data from 2018-09-01 to 2018-12-31
const alpha = {
    getToken: function () {
        return process.env.REACT_APP_ALPHA_API_KEY;
    },
    getQuoteURL: function (symbol) {
        const token = this.getToken();
        const url = `${URL_ALPHA}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${token}`;
        return url;
    },
    getSearchURL: function (query) {
        const token = this.getToken();
        const url = `${URL_ALPHA}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${token}`;
        return url;
    },
    getData: async function (url) {
        const response = await fetch(url);
        return await response.json();
    }
}

export default alpha;