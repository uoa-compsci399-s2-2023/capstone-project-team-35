const { app, BrowserWindow } = require('electron');
const path = require('path');
const child_process = require('child_process');


let mainWindow;
let backendProcess;

const createWindow = () => {
  // Create the Electron window for your React frontend
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
        webSecurity: false, // Disable web security (use with caution)
    },
});

  mainWindow.loadURL('http://localhost:3000');
  
  // Handle window close event
  mainWindow.on('closed', () => {
    mainWindow = null;
    // Terminate the backend process when the main window is closed
    if (backendProcess) {
      backendProcess.kill('SIGINT');
    }
  });
};

// Start the Flask backend before creating the Electron window
const startBackend = () => {
  // Replace 'path/to/your/flask/executable' with the path to your Flask executable
  backendProcess = child_process.spawn('flask-backend/dist/wsgi.exe', [], { shell: true });
  backendProcess.stdout.on('data', (data) => {
    console.log(`Flask: ${data}`);
  });
  backendProcess.stderr.on('data', (data) => {
    console.error(`Flask Error: ${data}`);
  });
  backendProcess.on('close', (code) => {
    console.log(`Flask process exited with code ${code}`);
  });
};

app.whenReady().then(() => {
  startBackend(); // Start the Flask backend

  setTimeout(() => {
    createWindow(); // Create the Electron window after a delay or as needed
  }, 3000);

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
