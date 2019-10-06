import { URL_ALPHA } from '../config';
import util from '../util';
import quote from "../seed/quote.json";
import search from "../seed/search.json";
import db from "./db";

const alpha = {
    getToken: function (callback) {
        if (util.isDev) {
            callback(process.env.REACT_APP_ALPHA_API_KEY);
        } else {
            db.getAPI((token) => {
                callback(token);
            });
        }
    },
    getQuoteURL: function (symbol, callback) {
        this.getToken((token) => {
            const url = `${URL_ALPHA}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${token}`;
            const ret = util.isDev ? "quote" : url;
            callback(ret);
        });
    },
    getSearchURL: function (query, callback) {
        this.getToken((token) => {
            const url = `${URL_ALPHA}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${token}`;
            const ret = util.isDev ? "search" : url;
            callback(ret);
        });
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
        if (quoteObj["Error Message"]) {
            return {};
        }
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
        if (searchObj["Error Message"] || searchObj["Note"]) {
            return [];
        }
        if (searchObj["bestMatches"]) {
            searchObj = searchObj["bestMatches"];
        }
        return searchObj.map((o) => alpha.sanitizeQuote(o));
    }
}

export default alpha;