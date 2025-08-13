const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting installation of Immortality Web Game Project Management Environment...');

// 确保目录存在
const adminPanelDir = path.join(__dirname, 'admin-panel');
const wikiDataDir = path.join(__dirname, 'wiki-data');

if (!fs.existsSync(adminPanelDir)) {
  console.log('Creating admin-panel directory...');
  fs.mkdirSync(adminPanelDir, { recursive: true });
}

if (!fs.existsSync(wikiDataDir)) {
  console.log('Creating wiki-data directory...');
  fs.mkdirSync(wikiDataDir, { recursive: true });
}

// 安装管理面板依赖
console.log('\nInstalling admin panel dependencies...');
try {
  process.chdir(adminPanelDir);
  execSync('npm install', { stdio: 'inherit' });
  console.log('Admin panel dependencies installed successfully!');
} catch (error) {
  console.error('Error installing admin panel dependencies:', error.message);
  process.exit(1);
}

// Install Wiki.js
console.log('\nInstalling Wiki.js...');
try {
  process.chdir(wikiDataDir);
  
  // Download the latest version of Wiki.js for Windows
  console.log('Downloading Wiki.js...');
  execSync('powershell -Command "[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri https://github.com/Requarks/wiki/releases/latest/download/wiki-js-windows.tar.gz -OutFile wiki-js.tar.gz"', { stdio: 'inherit' });
  
  // Extract files using tar command (available in Windows 10+)
   console.log('Extracting Wiki.js...');
   execSync('tar -xzf wiki-js.tar.gz', { stdio: 'inherit' });
  
  // Delete the archive
  execSync('powershell -Command "Remove-Item wiki-js.tar.gz"', { stdio: 'inherit' });
  
  // If config.sample.yml exists, rename it to config.yml
  if (fs.existsSync(path.join(wikiDataDir, 'config.sample.yml'))) {
    fs.renameSync(path.join(wikiDataDir, 'config.sample.yml'), path.join(wikiDataDir, 'config.yml'));
  }
  
  console.log('Wiki.js installed successfully!');
} catch (error) {
  console.error('Error installing Wiki.js:', error.message);
  process.exit(1);
}

// 返回项目根目录
process.chdir(__dirname);

console.log('\nCreating startup script...');

// 创建启动脚本
const startScript = `const { exec } = require('child_process');
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

console.log('\\nAdmin panel started!');
console.log('Please visit: http://localhost:3000');
`;

fs.writeFileSync(path.join(__dirname, 'start.js'), startScript);

console.log('\nInstallation complete!');
console.log('\nUsage Instructions:');
console.log('1. Run "node start.js" to start the admin panel');
console.log('2. Visit http://localhost:3000 to open the admin panel');
console.log('3. Start the Wiki service from the admin panel');
console.log('4. Visit http://localhost:8080 to set up and use the Wiki');