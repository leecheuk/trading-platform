const {ipcRenderer} = require('electron');

const db = {
    updateAPI: (apiKey) => {
        ipcRenderer.send('update-api', apiKey);
    },
    getAPI: (callback) => {
        ipcRenderer.send('get-api');
        ipcRenderer.on('api-key', (e, arg) => {
            callback(arg);
        })
    },
    removeAPIListener: () => {
        ipcRenderer.removeAllListeners('api-key');
    }
}

module.exports = db;