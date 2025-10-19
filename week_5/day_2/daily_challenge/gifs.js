// 1. Giphy API Key and Base URL
const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/random";

// DOM Elements
const form = document.getElementById('gif-form');
const input = document.getElementById('category-input');
const gifContainer = document.getElementById('gif-container');
const deleteAllButton = document.getElementById('delete-all-btn');

/**
 * 3. Fetches a random GIF based on the user's category.
 * @param {string} category - The search term for the GIF.
 */
async function fetchRandomGif(category) {
    // Construct the full API URL with the key and the category (tag)
    const url = `${GIPHY_BASE_URL}?api_key=${API_KEY}&tag=${category}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Check if data.data is an object (which it is for the random endpoint)
        if (data.data && data.data.images && data.data.images.original && data.data.images.original.url) {
            // Get the URL from the 'images' sub-object
            const gifUrl = data.data.images.original.url;
            appendGifToPage(gifUrl, category);
        } else {
            console.warn("No GIF found for this category or unexpected data structure.");
            alert(`No random GIF found for "${category}". Try a different term.`);
        }

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch GIF. Check your network or the API status.");
    }
}

/**
 * 4. Appends the fetched GIF and its DELETE button to the page.
 * @param {string} url - The direct URL of the GIF.
 * @param {string} category - The category used for the fetch.
 */
function appendGifToPage(url, category) {
    // Create the main container div for the item
    const gifItem = document.createElement('div');
    gifItem.className = 'gif-item';
    
    // Create the image element
    const img = document.createElement('img');
    img.src = url;
    img.alt = `GIF for category: ${category}`;
    
    // 4. Create the DELETE button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'DELETE';
    
    // 5. Allow deletion of a specific gif
    deleteButton.addEventListener('click', () => {
        gifItem.remove(); // Removes the parent div (the entire gif item)
    });
    
    // Append the elements to the item container
    gifItem.appendChild(img);
    gifItem.appendChild(deleteButton);
    
    // Append the item container to the main GIF container
    gifContainer.appendChild(gifItem);
}

// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop the form from submitting normally (reloading the page)
    
    const category = input.value.trim();
    if (category) {
        fetchRandomGif(category);
        input.value = ''; // Clear the input field after submission
    }
});

// 6. Event listener for the "DELETE ALL" button
deleteAllButton.addEventListener('click', () => {
    // Clears all content inside the gifContainer
    gifContainer.textContent = ''; 
});