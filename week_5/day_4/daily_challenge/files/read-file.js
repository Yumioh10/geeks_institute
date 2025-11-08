/**
 * Task 3: Uses the 'fs' module to read content from a file and displays it.
 * The function is exported using CommonJS module system.
 */
const fs = require('fs');
const path = require('path');

function readAndDisplayFileContent() {
    // Define the path relative to the current script execution location
    const filePath = path.join('./files/file-data.txt');
    
    try {
        // Read the content synchronously
        const content = fs.readFileSync(filePath, 'utf8');
        
        console.log('--- Task 3 Output (file-data.txt) ---');
        console.log(content.trim()); // Use trim() to clean up spacing

    } catch (error) {
        console.error(`\n❌ Error reading file: ${error.message}`);
        console.error('Ensure the "files/file-data.txt" path is correct.');
    }
}
readAndDisplayFileContent();
// Export the function
module.exports = { readAndDisplayFileContent };
