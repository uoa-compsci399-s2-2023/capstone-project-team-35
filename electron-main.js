const { app, BrowserWindow } = require('electron');
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

let mainWindow;
let backendProcess;
const scriptPath = path.join(__dirname, 'flask-backend/build_script/packaged_backend/ocellai_backend/ocellai_backend.exe'); 

const createWindow = () => {
  // Upload index.html file to localhost:3000 server
  const expressApp = express();
  const buildPath = path.join(__dirname, 'build');
  const nodePath = path.join(__dirname, 'node_modules/d3/dist');
  expressApp.use(express.static(buildPath)); 
  expressApp.use(express.static(nodePath)); 
  
  server = http.createServer(expressApp);
  server.listen(3000, 'localhost', () => {
    console.log('Express server is running at http://localhost:3000');
  });

  // Create the Electron window for your React frontend
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      webSecurity: false
    },
  });

  mainWindow.loadURL('http://localhost:3000');
  
  // Handle window close event
  mainWindow.on('closed', () => {
    mainWindow = null;

    if (backendProcess) {
      backendProcess.kill();
    }
  });
};

// Start the Flask backend only if it hasn't been started already
const startBackend = () => {
  console.log("BACKEND");
  backendProcess = spawn(scriptPath, [], { cwd: path.dirname(scriptPath) });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  backendProcess.on('error', (err) => {
    console.error(`Python process error: ${err.message}`);
  });
  
};

app.whenReady().then(() => {
  startBackend(); // Start the Flask backend

  setTimeout(() => {
    createWindow(); 
  }, 7500);
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', app.quit);

app.on('before-quit', () => {
  mainWindow.removeAllListeners('close');
  mainWindow.close();

  if (backendProcess) {
    backendProcess.kill();
  }
});
