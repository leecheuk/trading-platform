import { URL_ALPHA } from '../config';
import util from '../util';
import quote from "../seed/quote.json";
import search from "../seed/search.json";

const alpha = {
    getToken: function () {
        return process.env.REACT_APP_ALPHA_API_KEY;
    },
    getQuoteURL: function (symbol) {
        const token = this.getToken();
        const url = `${URL_ALPHA}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${token}`;
        return util.isDev ? "quote" : url;
    },
    getSearchURL: function (query) {
        const token = this.getToken();
        const url = `${URL_ALPHA}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${token}`;
        return util.isDev ? "search" : url;
    },
    getData: async function (url) {
        switch(url) {
            case "quote":
                return quote;
            case "search":
                return search;
            default:
                const response = await fetch(url);
                return await response.json();
        }
    },
    sanitizeQuote: function (quoteObj) {
        if (quoteObj["Global Quote"]) {
            quoteObj = quoteObj["Global Quote"];
        }
        let obj = {};
        Object.keys(quoteObj).map((k) => {
            const newKey = k.split(" ")[1]; 
            return obj[newKey] = quoteObj[k];
        });
        return obj;
    },
    sanitizeSearch: function (searchObj) {
        if (searchObj["bestMatches"]) {
            searchObj = searchObj["bestMatches"];
        }
        return searchObj.map((o) => alpha.sanitizeQuote(o));
    }
}

export default alpha;

alpha.sanitizeQuote(quote);
console.log(alpha.sanitizeSearch(search));