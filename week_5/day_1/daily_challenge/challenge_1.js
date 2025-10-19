/** 1st daily challenge
 * Converts all words in an array to uppercase if they are all strings.
 * @param {string[]} words - An array of words.
 * @returns {Promise<string[]>} A promise that resolves with the uppercased array
 * or rejects with an error message.
*/
const makeAllCaps = (words) => {
  return new Promise((resolve, reject) => {
    // Check if ALL elements in the array are of type 'string'
    if (words.every(word => typeof word === 'string')) {
      // If all are strings, convert them to uppercase and resolve
      const uppercasedWords = words.map(word => word.toUpperCase());
      resolve(uppercasedWords);
    } else {
      // If any element is not a string, reject the promise
      reject('Error: Not all elements in the array are strings!');
    }
  });
};

/**
 * Sorts an array of uppercased words alphabetically if the array length is > 4.
 * @param {string[]} words - An array of uppercased words.
 * @returns {Promise<string[]>} A promise that resolves with the sorted array
 * or rejects with an error message.
 */
const sortWords = (words) => {
  return new Promise((resolve, reject) => {
    // Check if the array length is greater than 4
    if (words.length > 4) {
      // If length is > 4, sort the array alphabetically and resolve
      const sortedWords = [...words].sort(); // Use spread to avoid modifying the original array
      resolve(sortedWords);
    } else {
      // If array length is 4 or less, reject the promise
      reject('Error: Array length must be bigger than 4 to sort.');
    }
  });
};
 // Test Execution

// Test 1: Catch executed (non-string element)
makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error));
// Expected Output: Error: Not all elements in the array are strings!

// Test 2: Catch executed (array length <= 4)
makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error));
// Expected Output: Error: Array length must be bigger than 4 to sort.

// Test 3: Success (array length > 4)
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error));
// Expected Output: ["APPLE", "BANANA", "KIWI", "MELON", "PEAR"]

// OUTPUt:
makeAllCaps([ "tomatos", "cucumber", "avocado" ])
  .then((arr) => {
    return arr.sort(); // Assuming this manual sort replaced the failing sortWords()
  })
  .then((result) => console.log(result))
  .catch(error => console.log(error));

/* 2nd daily challenge */
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

/**
 * 1. Converts the morse JSON string to a JavaScript object.
 * @returns {Promise<Object>} A Promise that resolves with the morse object or rejects on failure.
 */
function toJs() {
  return new Promise((resolve, reject) => {
    try {
      // Safely parse the JSON string
      const morseJS = JSON.parse(morse);

      // Check if the resulting object is empty
      if (Object.keys(morseJS).length === 0) {
        reject("Error: The Morse JavaScript object is empty.");
      } else {
        // Resolve with the populated object
        resolve(morseJS);
      }
    } catch (e) {
      // Catch any parsing errors
      reject("Error converting Morse JSON to JavaScript object: " + e.message);
    }
  });
}

/**
 * 2. Asks the user for a word/sentence and translates it to Morse code.
 * @param {Object} morseJS - The morse JavaScript object.
 * @returns {Promise<string[]>} A Promise that resolves with the morse translation array or rejects if a character is missing.
 */
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    // Prompt the user for input and convert it to lowercase for easy lookup
    const userInput = prompt("Enter a word or a sentence to translate to Morse code (e.g., Hello):");

    // Handle user cancelling the prompt or entering nothing
    if (userInput === null || userInput.trim() === "") {
        reject("Translation cancelled or empty input.");
        return;
    }

    const inputLower = userInput.toLowerCase();
    const translation = [];

    for (const char of inputLower) {
      // Check if the character exists in the morse object
      if (morseJS[char]) {
        translation.push(morseJS[char]);
      } else {
        // Reject the promise if an unknown character is found
        reject(`Error: Character "${char}" does not exist in the Morse code dictionary.`);
        return; // Stop the function immediately on error
      }
    }

    // Resolve with the completed translation array
    resolve(translation);
  });
}

/**
 * 3. Joins the Morse translation array using a line break and displays it on the DOM.
 * @param {string[]} morseTranslation - The array of translated Morse code symbols.
 * @returns {void}
 */
function joinWords(morseTranslation) {
  // Join the array elements using a line break character
  const result = morseTranslation.join("\n");
  
  // Display the result on the DOM (e.g., in the body)
  console.log("--- Translation Result ---\n" + result); // Also log for non-browser environments
  
  // Create a <pre> element to respect line breaks for display
  const preElement = document.createElement("pre");
  preElement.textContent = result;
  
  // Optional: Clear previous content and append the new result
  document.body.textContent = '<h2>Morse Code Translation</h2>';
  document.body.appendChild(preElement);
  
  // You could also resolve with the final string if this were another promise
  // return Promise.resolve(result);
}

// --- Promise Chain ---

// Start the chain
toJs()
  .then(morseJS => {
    // 1. Convert successful, pass the object to the next function
    console.log("Step 1: JSON successfully converted to JavaScript Object.");
    return toMorse(morseJS);
  })
  .then(morseTranslation => {
    // 2. Translation successful, pass the array to the final function
    console.log("Step 2: Word successfully translated to Morse array.");
    return joinWords(morseTranslation);
  })
  .catch(error => {
    // 3. Catch any error from any step in the chain
    console.error("A challenge error occurred:", error);
    
    // Display the error message on the DOM for user feedback
    document.body.textContent = `<h2>Translation Error</h2><p style="color: red;">${error}</p>`;
  });

// Add a note about the prompt/DOM functionality for clarity
console.log("\n*** NOTE: A prompt window should appear to ask for your input. ***");
console.log("*** The final result (or error) will be printed to the console and displayed on the webpage (DOM). ***");


