const { contextBridge, app } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getAppPath: app.getAppPath
});