/**
 * Checks if the first string is an anagram of the second string.
 *
 * An anagram requires the two strings to have the exact same characters 
 * with the exact same frequencies, ignoring case and whitespace.
 *
 * @param {string} str1 The first string.
 * @param {string} str2 The second string.
 * @returns {boolean} True if str1 is an anagram of str2, False otherwise.
 */
const isAnagram = (str1, str2) => {
    // Helper function to clean and normalize a string
    const cleanString = (str) => {
        // 1. Convert to lowercase
        // 2. Remove all whitespace globally (using the regex /\s/g)
        // 3. Split into an array of characters
        // 4. Sort the characters
        // 5. Join them back into a single string
        return str
            .toLowerCase()
            .replace(/\s/g, '')
            .split('')
            .sort()
            .join('');
    };

    // Normalize both strings and compare them directly
    return cleanString(str1) === cleanString(str2);
};

// --- Examples ---
console.log(`"Astronomer" and "Moon starer": ${isAnagram('Astronomer', 'Moon starer')}`);
console.log(`"School master" and "The classroom": ${isAnagram('School master', 'The classroom')}`);
console.log(`"Apple" and "Plaae": ${isAnagram('Apple', 'Plaae')}`);
console.log(`"Listen" and "Silent": ${isAnagram('Listen', 'Silent')}`);