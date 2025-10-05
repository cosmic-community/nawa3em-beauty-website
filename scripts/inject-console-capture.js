const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(
  path.join(__dirname, '../public/dashboard-console-capture.js'),
  'utf8'
);

const buildDir = path.join(__dirname, '../.next');

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture')) return;
  
  const scriptTag = `<script>${scriptContent}</script>`;
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}</head>`);
  } else if (content.includes('<body>')) {
    content = content.replace('<body>', `<body>${scriptTag}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(buildDir)) {
  walkDir(buildDir);
  console.log('Console capture script injected into build');
}