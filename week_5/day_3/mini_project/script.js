// Base URL for the Star Wars API (SWAPI)
const BASE_URL = "https://www.swapi.tech/api";
const TOTAL_CHARACTERS = 83; // As per the note in the instructions

// --- 1. Retrieve elements from the DOM ---
const card = document.getElementById('character-card');
const messageElement = document.getElementById('message');
const infoDetailsContainer = document.getElementById('info-details');
const button = document.getElementById('button');

// Character detail elements
const charName = document.getElementById('name');
const charHeight = document.getElementById('height');
const charGender = document.getElementById('gender');
const charBirthYear = document.getElementById('birth-year');
const charHomeWorld = document.getElementById('home-world');


// --- Helper Functions to Control Display ---

/** * 3. Displays a loading message and spinner.
 */
const showLoading = () => {
    infoDetailsContainer.style.display = 'none';
    button.disabled = true; // Disable button during loading
    messageElement.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading...</p>
    `;
    messageElement.style.display = 'block';
};

/**
 * 4. Displays an error message.
 */
const showError = (error) => {
    infoDetailsContainer.style.display = 'none';
    button.disabled = false; // Enable button after error
    console.error("Fetch Error:", error);
    messageElement.innerHTML = `
        <i class="fas fa-bug"></i>
        <p>Oh No! That went wrong. Try again.</p>
    `;
    messageElement.style.display = 'block';
};

/**
 * Hides the loading/error message and shows the character details.
 */
const showDetails = () => {
    messageElement.style.display = 'none';
    infoDetailsContainer.style.display = 'block';
    button.disabled = false; // Enable button after successful load
};


// --- 3. & 2. Functions to get and display data ---

/**
 * 2. Fetches the homeworld name using a URL.
 * @param {string} homeworldUrl - The API URL for the homeworld planet.
 * @returns {Promise<string>} The name of the homeworld.
 */
async function fetchHomeworldName(homeworldUrl) {
    if (!homeworldUrl) return 'unknown';
    
    const response = await fetch(homeworldUrl);
    const data = await response.json();
    return data.result.properties.name || 'unknown';
}

/**
 * 2. & 3. Gets a random character's data, handles the AJAX call, and displays it.
 */
async function getCharacterData() {
    showLoading(); // Show the loading indicator immediately

    // Generate a random ID between 1 and 83 (inclusive)
    const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
    const characterUrl = `${BASE_URL}/people/${randomId}`;

    try {
        // Fetch character data
        const charResponse = await fetch(characterUrl);
        
        if (!charResponse.ok) {
            throw new Error(`Oh No! That person isnt available ${charResponse.status}`);
        }

        const charData = await charResponse.json();
        
        // Extract required properties
        const properties = charData.result.properties;
        const homeworldUrl = properties.homeworld;
        
        // Fetch homeworld name separately
        const homeworldName = await fetchHomeworldName(homeworldUrl);
        
        // 2. & 3. Display the info on the DOM
        charName.textContent = properties.name;
        charHeight.textContent = properties.height;
        charGender.textContent = properties.gender;
        charBirthYear.textContent = properties.birth_year;
        charHomeWorld.textContent = homeworldName;

        showDetails(); // Hide loading and show the card
        
    } catch (error) {
        showError(error); // Display error message
    }
}


// --- Event Listener ---
button.addEventListener('click', getCharacterData);

// Optional: Load an initial character when the page loads
document.addEventListener('DOMContentLoaded', getCharacterData);