// --- Exercise 7: Welcome (Navbar) ---

// 2. Create a self invoking function that takes 1 argument: the name of the user.
// 3. The function should add a div in the nabvar, displaying the name of the user and his profile picture.

((userName) => {
    // 1. Get a reference to the navbar element
    const navbar = document.getElementById('main-navbar');

    if (!navbar) {
        console.error("Navbar element not found.");
        return;
    }

    // 2. Create the main div for the user welcome message
    const welcomeDiv = document.createElement('div');
    // Tailwind classes for the wrapper: flex, items-center, space-x-3 (margin between children), p-2, rounded-lg, bg-gray-700
    welcomeDiv.className = 'flex items-center space-x-3 p-2 rounded-lg bg-gray-700';
    
    // 3. Create the profile picture element
    const profilePic = document.createElement('div');
    // Tailwind classes for the profile pic: w-8, h-8 (width/height), rounded-full, bg-gray-400 (placeholder color)
    profilePic.className = 'w-8 h-8 rounded-full bg-gray-400 border-2 border-white';
    
    // 4. Create a span to hold the welcome text
    const welcomeText = document.createElement('span');
    // Tailwind classes for the text: text-sm (font size), font-medium
    welcomeText.className = 'text-sm font-medium';
    
    // Insert the user's name
    welcomeText.textContent = `Welcome, ${userName}!`;
    
    // 5. Append the picture and text to the welcome div
    welcomeDiv.appendChild(profilePic);
    welcomeDiv.appendChild(welcomeText);

    // 6. Append the new welcome div to the existing navbar
    navbar.appendChild(welcomeDiv);

})('Sarah'); // Invoking the function with 'Sarah'