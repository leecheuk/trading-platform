const {ipcRenderer} = require('electron');

const db = {
    updateAPI: (apiKey) => {
        ipcRenderer.send('update-api', apiKey);
    },
    getAPI: (callback) => {
        db._getResource('api', callback);
    },
    removeAPIListener: () => {
        ipcRenderer.removeAllListeners('api-key');
    },
    favouriteStock: (stock) => {
        ipcRenderer.send('favourite-stock', stock);
    },
    getFavourites: (callback) => {
        db._getResource('favourites', callback);
    },
    removeFavouriteListener: () => {
        ipcRenderer.removeAllListeners(['favourites', 'favourite-stock']);
    },
    order: (stock, callback) => {
        ipcRenderer.send(`${stock.type}-order`, stock);
        ipcRenderer.on(`${stock.type}`, () => {
            callback();
        });
    },
    getPortfolio: (callback) => {
        db._getResource('portfolio', callback);
    },
    getPortfolioStock: (stock_id, callback) => {
        ipcRenderer.send('get-portfolio-stock', stock_id);
        ipcRenderer.on(`portfolio-stock`, (e, s) => {
            callback(s);
        });
    },
    removePortfolioStockListener: () => {
        ipcRenderer.removeAllListeners(['portfolio-stock', 'get-portfolio-stock']);
    },
    removePortfolioListener: () => {
        ipcRenderer.removeAllListeners(['portfolio', 'get-portfolio']);
    },
    _getResource: (resource, callback) => {
        ipcRenderer.send(`get-${resource}`);
        ipcRenderer.on(resource, (e, res) => {
            callback(res);
        });
    },
    getUser: (callback) => {
        db._getResource('user', callback);
    },
    removeUserListener: () => {
        ipcRenderer.removeAllListeners(['get-user']);
    },
    getOrders: (callback) => {
        db._getResource('orders', callback);
    },
    removeOrdersListener: () => {
        ipcRenderer.removeAllListeners(['get-orders', 'orders']);
    }
}

module.exports = db;