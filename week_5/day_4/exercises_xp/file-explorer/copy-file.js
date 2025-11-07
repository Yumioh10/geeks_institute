import fs from 'fs';

const sourceFile = 'source.txt';
const destinationFile = 'destination.txt';

try {
    // Read the content from the source file (synchronously)
    console.log(`Reading content from: ${sourceFile}`);
    const content = fs.readFileSync(sourceFile, 'utf8');
    
    // Write the content to the destination file (synchronously)
    fs.writeFileSync(destinationFile, content);
    
    console.log(`\n✅ Successfully copied content from '${sourceFile}' to '${destinationFile}'.`);
    
} catch (error) {
    // Handle errors, typically if source.txt does not exist or permissions are wrong
    console.error(`\n❌ Error during file copy: ${error.message}`);
}
