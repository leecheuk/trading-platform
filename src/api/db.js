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
    order: (stock) => {
        ipcRenderer.send(`${stock.type}-order`, stock);
    },
    getPortfolio: (callback) => {
        db._getResource('portfolio', callback);
    },
    _getResource: (resource, callback) => {
        ipcRenderer.send(`get-${resource}`);
        ipcRenderer.on(resource, (e, res) => {
            callback(res);
        });
    },
    getUser: (callback) => {
        db._getResource('user', callback);
    }
}

module.exports = db;