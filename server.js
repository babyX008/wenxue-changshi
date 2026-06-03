const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const fullPath = path.join(DIR, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(fullPath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  console.log('\n  📱 文学常识知识巩固 PWA 已启动\n');
  console.log('  本机访问: http://localhost:' + PORT);
  console.log('  ──────────────────────────────');
  Object.values(ifaces).forEach(iface => {
    iface.forEach(addr => {
      if (addr.family === 'IPv4' && !addr.internal) {
        console.log('  手机访问: http://' + addr.address + ':' + PORT);
      }
    });
  });
  console.log('\n  安卓操作: Chrome 打开上方地址 → 菜单 → "添加到主屏幕"\n');
});
