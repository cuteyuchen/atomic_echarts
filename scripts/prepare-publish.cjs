const fs = require('fs');
const path = require('path');

const tempDir = path.join(__dirname, '..', 'temp-publish');
const distDir = path.join(__dirname, '..', 'dist');
const rootDir = path.join(__dirname, '..');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

function copyDistFiles(src, dest) {
  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDistFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDistFiles(distDir, tempDir);

fs.copyFileSync(path.join(rootDir, 'package.json'), path.join(tempDir, 'package.json'));
fs.copyFileSync(path.join(rootDir, 'LICENSE'), path.join(tempDir, 'LICENSE'));
fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(tempDir, 'README.md'));

const packageJson = JSON.parse(fs.readFileSync(path.join(tempDir, 'package.json'), 'utf8'));
packageJson.main = "index.js";
packageJson.module = "index.js";
packageJson.types = "index.d.ts";
packageJson.exports = {
  ".": {
    "types": "./index.d.ts",
    "import": "./index.js",
    "default": "./index.js"
  },
  "./config/*": {
    "types": "./config/*.d.ts",
    "import": "./config/*.js",
    "default": "./config/*.js"
  },
  "./hooks/*": {
    "types": "./hooks/*.d.ts",
    "import": "./hooks/*.js",
    "default": "./hooks/*.js"
  },
  "./types": {
    "types": "./types/index.d.ts",
    "import": "./types/index.js",
    "default": "./types/index.js"
  },
  "./types/*": {
    "types": "./types/*.d.ts",
    "import": "./types/*.js",
    "default": "./types/*.js"
  },
  "./utils/*": {
    "types": "./utils/*.d.ts",
    "import": "./utils/*.js",
    "default": "./utils/*.js"
  },
  "./package.json": "./package.json"
};
packageJson.files = [
  "*.js",
  "*.d.ts",
  "config",
  "hooks",
  "types",
  "utils",
  "LICENSE",
  "README.md"
];
fs.writeFileSync(path.join(tempDir, 'package.json'), JSON.stringify(packageJson, null, 2));

console.log('准备发布文件完成，临时目录:', tempDir);
console.log('请进入临时目录执行 npm publish');
