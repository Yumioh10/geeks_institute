import fs from 'fs';
import path from 'path';

// Set the directory to read (current directory where the script is run)
const directoryPath = path.resolve('.');

try {
    // Read the list of files in the current directory (synchronously)
    const files = fs.readdirSync(directoryPath);
    
    console.log(`\n--- Files Found in '${path.basename(directoryPath)}' ---`);
    
    // Display the names of the files
    files.forEach(file => {
        console.log(`- ${file}`);
    });
    console.log("-------------------------------------------\n");
    
} catch (error) {
    console.error(`\n❌ Error reading directory: ${error.message}`);
}
