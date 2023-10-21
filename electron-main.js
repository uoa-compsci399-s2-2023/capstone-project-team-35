const { app, BrowserWindow } = require('electron');
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const http = require('http');

let mainWindow;
let backendProcess; 

const createWindow = () => {
  // Defining an express server.
  const expressApp = express();

  // Finding the complete paths for the static build folder and the directory containing the d3.js file.
  const buildPath = path.join(__dirname, 'build');
  const nodePath = path.join(__dirname, 'node_modules/d3/dist');

  // Labelling these directories as locations for static files so that the express folder will run them as the correct content-type rather than the default text/html.
  expressApp.use(express.static(buildPath)); 
  expressApp.use(express.static(nodePath)); 
  
  // Creating the express server on port 'localhost:3000'.
  server = http.createServer(expressApp);

  // Debugging if the server has been hosted correctly. Will put a message in the console if it has.
  server.listen(3000, 'localhost', () => {
    console.log('Express server is running at http://localhost:3000');
  });

  // Create the Electron window for the React frontend
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      webSecurity: false
    },
  });

  // Loading the contents of 'localhost:3000' onto the electron window. This should be the react front end as the reacts built index.html file is being hosted on 'localhost:3000'. 
  mainWindow.loadURL('http://localhost:3000');
  
  // Handle window close event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Method which starts up the backend server by launching the given python executable.
const startBackend = () => {

  // Finding the complete path for the python backend executable.
  const scriptPath = path.join(__dirname, 'flask-backend/build_script/packaged_backend/ocellai_backend/ocellai_backend.exe');

  // Displaying the path of the given python executable.
  console.log(`Executing Flask backend at path: ${scriptPath}`);

  // Executing the python executable from it's directory.
  backendProcess = exec(scriptPath, { cwd: path.dirname(scriptPath) });

  // The next few methods are debugging the python backend and displaying information on it in the backend console.
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

// Handle application launch event
app.whenReady().then(() => {
  // Starts the flask backend.
  startBackend();

  // Waits 7.5 seconds before launching the application window. This is allow the backend to fully start up before the user can interact with the application.
  setTimeout(() => {
    createWindow(); 
  }, 7500);
});

// Handles application activation event.
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Quits the app when all electron windows have been closed.
app.on('window-all-closed', app.quit);

// The following code is called just before the application quits.
app.on('before-quit', () => {

  // Kills all executables currently running called 'ocellai_backend.exe' (whhich is the flask backend executable).
  const processName = 'ocellai_backend.exe';
  const killCommand = `taskkill /F /IM ${processName}`;
  exec(killCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error killing process: ${error}`);
    } else {
      console.log(`Process ${processName} has been terminated.`);
    }
  });

  // Remove all 'close' event listeners from 'mainWindow' and close it.
  mainWindow.removeAllListeners('close');
  mainWindow.close();
});
