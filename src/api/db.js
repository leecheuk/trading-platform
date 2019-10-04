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
    buyOrder: (stock) => {
        ipcRenderer.send('buy-order', stock);
    },
    sellOrder: (stock) => {
        ipcRenderer.send('sell-order', stock);
    },
    getPortfolio: (callback) => {
        db._getResource('portfolio', callback);
    },
    _getResource: (resource, callback) => {
        ipcRenderer.send(`get-${resource}`);
        ipcRenderer.on(resource, (e, res) => {
            console.log(resource, res);
            callback(res);
        });
    }
}

module.exports = db;