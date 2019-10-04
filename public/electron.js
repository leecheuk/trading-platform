const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

// db
const database = require('../src/controllers');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setResizable(false);
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);

  // db
  const db = database();
  const ipcMain = electron.ipcMain;
  db.getUser((row) => {
    if (!row) {
      db.initializeUser();
    }
  });
  ipcMain.on('update-api', (e, apiKey) => {
    db.updateAPI(apiKey);
  })
  ipcMain.on('get-api', (e) => {
    db.getAPI((api) => {
      e.reply('api-key', api);
    });
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});