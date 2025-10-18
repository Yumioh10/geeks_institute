class Video {
  /**
   * Constructs a new Video instance.
   * @param {string} title - The title of the video.
   * @param {string} uploader - The name of the person who uploaded the video.
   * @param {number} time - The duration of the video in seconds.
   */
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  /**
   * Displays a string showing that the uploader watched the video.
   * @returns {string} The watch message.
   */
  watch() {
    // The required string format: "uploader parameter watched all time parameter of title parameter!"
    return `${this.uploader} watched all ${this.time} seconds of "${this.title}"!`;
  }
}

// 3. Instantiate a new Video instance and call the watch() method.
const video1 = new Video("Introduction to JavaScript", "John Doe", 300);
console.log("Video 1 Watch Message:", video1.watch()); 
// Expected Output: "John Doe watched all 300 seconds of "Introduction to JavaScript"!"

// 4. Instantiate a second Video instance with different values.
const video2 = new Video("OOP Concepts Explained", "Jane Smith", 750);
console.log("Video 2 Watch Message:", video2.watch()); 
// Expected Output: "Jane Smith watched all 750 seconds of "OOP Concepts Explained"!"

// 5. Bonus: Use an array to store data for five Video instances.
const videoData = [
  { title: "Quantum Mechanics for Dummies", uploader: "Dr. Sheldon", time: 1200 },
  { title: "Top 10 Coffee Recipes", uploader: "Barista Bot", time: 450 },
  { title: "How to Train Your Dragon", uploader: "Hiccup Haddock", time: 6000 },
  { title: "Meditative Sounds of Rain", uploader: "Zen Stream", time: 3600 },
  { title: "Travel Vlogging 101", uploader: "Wanderer Sam", time: 900 }
];

console.log("\n--- Bonus Step 5: Video Data Array ---");
console.log("Data structure chosen: Array of Objects.");
console.log(videoData);

// 6. Bonus: Loop through the array to instantiate those instances.
const videoInstances = [];

console.log("\n--- Bonus Step 6: Instantiation Loop ---");
for (const data of videoData) {
  // Destructuring to easily access properties
  const { title, uploader, time } = data;
  
  // Create a new Video instance
  const newVideo = new Video(title, uploader, time);
  
  // Store the instance
  videoInstances.push(newVideo);
  
  // Demonstrate the watch() method on the new instance
  console.log(`Instantiated: "${newVideo.title}". Message: ${newVideo.watch()}`);
}

console.log("\nFinal array of Video instances:", videoInstances);
// videoInstances now holds five fully-functional Video objects.