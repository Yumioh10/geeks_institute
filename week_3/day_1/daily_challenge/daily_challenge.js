                      // Daily challenge: Not Bad

// 1. Create a variable called sentence
const sentence = "The movie is not that bad, I like it";

// 2. Create a variable called wordNot
const wordNot = sentence.indexOf("not");

// 3. Create a variable called wordBad
const wordBad = sentence.indexOf("bad");
console.log(`'not' starts at index: ${wordNot}`);
console.log(`'bad' starts at index: ${wordBad}`);

// 4/5
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  const firstPart = sentence.slice(0, wordNot);
  const endOfBad = wordBad + 3;
  const lastPart = sentence.slice(endOfBad);
  const newSentence = firstPart + "good" + lastPart;
console.log(newSentence);
} else {
  console.log(sentence);
}

                      // Daily challenge: Stars

// --- Solution 1: Single Loop using String.prototype.repeat() ---
function generatePatternSingleLoop(rows = 5) {
    console.log("--- Single Loop Solution ---");
    // The loop iterates once for each line/row we need to print.
    for (let i = 1; i <= rows; i++) {
        // In each iteration, we take the asterisk character and repeat it
        // 'i' times (1 time for row 1, 2 times for row 2, etc.).
        const line = "*".repeat(i);
        console.log(line);
    }
}

generatePatternSingleLoop(5);

// --- Solution 2: Two Nested For Loops ---
function generatePatternNestedLoops(rows = 5) {
    console.log("\n--- Nested Loops Solution ---");
    let line = "";

    // OUTER LOOP: Controls the number of rows (i = 1 to 5)
    for (let i = 1; i <= rows; i++) {
        line = ""; // Reset the line string for the new row

        // INNER LOOP: Controls how many stars are added to the current line (j = 1 up to i)
        for (let j = 1; j <= i; j++) {
            // Add one star to the line string in each inner iteration
            line += "*";
        }

        // After the inner loop finishes building the line, print the complete line
        console.log(line);
    }
}

generatePatternNestedLoops(5);