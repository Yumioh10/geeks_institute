// Exercise 3: File Management using CommonJS syntax

// 6. In app.js, import the functions from the fileManager.js module.
const { readFile, writeFile } = require('./fileManager.js');

const helloFilePath = 'Hello World.txt';
const byeFilePath = 'Bye World.txt';
const newContent = 'Writing to the file';

console.log('--- Starting File Management Operations ---');

// 7a. Use the imported function to read the content of the “Hello World.txt” text file.
const helloContent = readFile(helloFilePath);

if (helloContent) {
  console.log(`\n1. READ OPERATION:`);
  console.log(`Content of "${helloFilePath}":\n"${helloContent.trim()}"`);
}

// 7b. Write to the “Bye World.txt” with the content “Writing to the file”.
console.log(`\n2. WRITE OPERATION:`);
writeFile(byeFilePath, newContent);

// Verification Step: Read the content of Bye World.txt again to confirm the write operation.
console.log(`\n3. VERIFICATION READ:`);
const byeContent = readFile(byeFilePath);

if (byeContent) {
  console.log(`Content of "${byeFilePath}" (after write):\n"${byeContent.trim()}"`);
  
  if (byeContent.trim() === newContent) {
    console.log('\n✅ Verification successful: The file content matches the new content.');
  } else {
    console.log('\n❌ Verification failed: The file content did not update correctly.');
  }
}

console.log('\n--- Operations Complete ---');