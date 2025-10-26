/* Exercise 3: File Management using CommonJS syntax

/* 2. define a module that exports functions for reading and writing files.*/
const fs = require('fs');

function readFile(filePath) {
  try {
    // 'utf8' tells Node.js to return the file content as a human-readable string.
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    // This is simple error handling to catch cases where the file doesn't exist.
    console.error(`Error in readFile: Could not read file at ${filePath}.`, error.message);
    return ''; 
  }
}
function writeFile(filePath, content) {
  try {
    // If the file exists, it will be overwritten. If it doesn't, it will be created.
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Manager] Successfully wrote content to: ${filePath}`);
  } catch (error) {
    console.error(`[Manager] Error in writeFile: Could not write to file at ${filePath}.`, error.message);
  }
}

// 2. Export functions named readFile and writeFile using CommonJS syntax.
module.exports = {
  readFile: readFile,
  writeFile: writeFile
};
// 3. 
