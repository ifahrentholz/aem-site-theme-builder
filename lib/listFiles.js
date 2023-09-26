/*
Copyright 2021 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const fs = require('fs');
const path = require('path');

const filesList = [];

function listFiles (dir) {
  if (!fs.existsSync(dir)) {
    console.log(`[aem-site-theme-builder] Location not found: ${dir}`);
    return [];
  }

  const stats = fs.statSync(dir);

  if (!stats.isDirectory()) {
    filesList.push(dir);
    return;
  }

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (!filesList.includes(filePath)) {
      listFiles(filePath);
    }
  });

  return filesList.map(path.normalize);
}

module.exports = listFiles;
