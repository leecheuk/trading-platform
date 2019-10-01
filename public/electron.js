const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

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
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);

  // db
  const sqlite3 = require('sqlite3');

  let db = new sqlite3.Database('./db/app.db', (err) => {
    if (err) {
      return console.error(err.message);
    } else {
      console.log('Connected to the app.db SQlite database.');
    }
  });
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS watchlist(symbol TEXT)');
  });
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