const express = require('express');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Service status
let services = {
  doc: { running: false, process: null, port: 5173 },
  // More services can be added in the future
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint - Get all service statuses
app.get('/api/services', (req, res) => {
  const servicesStatus = {};
  
  Object.keys(services).forEach(service => {
    servicesStatus[service] = {
      running: services[service].running,
      port: services[service].port
    };
  });
  
  res.json(servicesStatus);
});

// API endpoint - Start service
app.post('/api/services/:service/start', (req, res) => {
  const { service } = req.params;
  
  if (!services[service]) {
    return res.status(404).json({ error: `Service ${service} does not exist` });
  }
  
  if (services[service].running) {
    return res.json({ message: `${service} service is already running` });
  }
  
  try {
    // Start different processes based on service type
    if (service === 'doc') {
      const docProcess = exec('npm run docs:dev', { cwd: path.join(__dirname, '..', 'doc') });
      
      services[service].process = docProcess;
      services[service].running = true;
      
      docProcess.stdout.on('data', (data) => {
        console.log(`Doc stdout: ${data}`);
      });
      
      docProcess.stderr.on('data', (data) => {
        console.error(`Doc stderr: ${data}`);
      });
      
      docProcess.on('close', (code) => {
        console.log(`Doc process exited with code ${code}`);
        services[service].running = false;
        services[service].process = null;
      });
      
      return res.json({ message: `${service} service started` });
    }
    
    // Add startup logic for other services
    
    return res.status(400).json({ error: `Unable to start ${service} service` });
  } catch (error) {
    console.error(`Error starting ${service} service:`, error);
    return res.status(500).json({ error: `Error starting ${service} service: ${error.message}` });
  }
});

// API endpoint - Stop service
app.post('/api/services/:service/stop', (req, res) => {
  const { service } = req.params;
  
  if (!services[service]) {
    return res.status(404).json({ error: `Service ${service} does not exist` });
  }
  
  if (!services[service].running) {
    return res.json({ message: `${service} service is not running` });
  }
  
  try {
    if (service === 'doc') {
      if (services[service].process) {
        services[service].process.kill();
      }
      
      services[service].running = false;
      services[service].process = null;
      
      return res.json({ message: `${service} service stopped` });
    }
    
    // Add stop logic for other services
    
    return res.status(400).json({ error: `Unable to stop ${service} service` });
  } catch (error) {
    console.error(`Error stopping ${service} service:`, error);
    return res.status(500).json({ error: `Error stopping ${service} service: ${error.message}` });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Admin panel server running at http://localhost:${port}`);
});