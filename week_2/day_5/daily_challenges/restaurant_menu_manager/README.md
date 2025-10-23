🍽️ Restaurant Menu Manager (Local Storage Demo)

This is a single-file, client-side application designed to manage a restaurant menu. It demonstrates basic CRUD (Create, Read, Update, Delete) operations using plain JavaScript and the browser's built-in Local Storage for data persistence.

Because it is a single HTML file, it requires no backend server or database configuration to run.

✨ Features

This application provides a simple, responsive interface to manage menu items:

View Menu: Displays a list of all current menu items in a table.

Add Item: Creates a new menu item with a name and price.

Update Item: Allows editing the name and price of an existing item.

Delete Item: Permanently removes an item from the menu after confirmation.

Persistence: All data is saved directly in the browser using localStorage, meaning your items will remain saved even after closing and reopening the application.

💻 Technology Stack

HTML5: Structure of the application.

JavaScript (Vanilla JS): All application logic, including CRUD functions and UI rendering.

Tailwind CSS: Used via CDN for all styling and responsive design.

localStorage: Simulates the database for persistent storage.

🚀 How to Run

Since this is a single, self-contained HTML file, running it couldn't be simpler:

Save the File: Save the entire code content (from the menu.html file) into a file named index.html or menu.html on your computer.

Open in Browser: Double-click the saved file.

The application will open immediately in your default web browser (Chrome, Firefox, Safari, etc.) and is ready to use.

💾 Data Persistence Note

This project uses localStorage to simulate a database connection.

What this means: When you add, edit, or delete items, the data is stored only on your local computer within your browser's memory.

Key: The menu data is stored under the key 'restaurantMenu'.

Limitations: This data cannot be shared with other users or accessed from a different browser or device. If you clear your browser's site data or cache, the menu will reset to its default state.