import {URL_IEX} from '../config';

const iex = {
    getToken: function() {
        return process.env.API_TOKEN;
    },
    getStockURL: function(symbol) {
        const token = process.env.API_TOKEN;
        return `${URL_IEX}/stock/${symbol}/quote?token=${token}`;
    }
}

export default iex;