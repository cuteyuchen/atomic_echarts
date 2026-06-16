const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publishDirs = ['dist', 'temp-publish'];

function assertInsideRoot(targetPath) {
  const relativePath = path.relative(rootDir, targetPath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`拒绝删除项目目录外的路径: ${targetPath}`);
  }
}

publishDirs.forEach(dirName => {
  const targetPath = path.resolve(rootDir, dirName);
  assertInsideRoot(targetPath);

  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(`已删除发布目录: ${targetPath}`);
  }
});
