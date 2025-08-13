const { exec } = require('child_process');
const path = require('path');

console.log('Starting Immortality Web Game Project Management Environment...');

// Start admin panel
const adminPanel = exec('npm start', { cwd: path.join(__dirname, 'admin-panel') });

adminPanel.stdout.on('data', (data) => {
  console.log("Admin Panel: " + data);
});

adminPanel.stderr.on('data', (data) => {
  console.error("Admin Panel Error: " + data);
});

console.log('\nAdmin panel started!');
console.log('Please visit: http://localhost:3000');
