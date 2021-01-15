// Modules
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow,secendaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true },
    show: false
  })
  secendaryWindow = new BrowserWindow({
    width: 600, height: 400,
    webPreferences: { nodeIntegration: true },
    show: false,
    parent: mainWindow,
    modal: true,
  })
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secendaryWindow.loadFile('secendary.html')

  // Open DevTools - Remove for PRODUCTION!
 // mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show',mainWindow.show)
  secendaryWindow.once('ready-to-show',secendaryWindow.show)
  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  secendaryWindow.on('closed',  () => {
    secendaryWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})