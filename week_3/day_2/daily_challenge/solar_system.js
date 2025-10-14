// Select the section where planets will be added
const section = document.querySelector(".listPlanets");

// Step 1: Create an array of planet objects
const planets = [
  { name: "Mercury", color: "gray", moons: 0 },
  { name: "Venus", color: "orange", moons: 0 },
  { name: "Earth", color: "blue", moons: 1 },
  { name: "Mars", color: "red", moons: 2 },
  { name: "Jupiter", color: "brown", moons: 79 },
  { name: "Saturn", color: "goldenrod", moons: 83 },
  { name: "Uranus", color: "lightblue", moons: 27 },
  { name: "Neptune", color: "darkblue", moons: 14 }
];

// Step 2: Loop through each planet
planets.forEach((planet) => {
  // Create a planet div
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");
  planetDiv.style.backgroundColor = planet.color;
  planetDiv.textContent = planet.name;

  // Step 3: Create moon(s)
  for (let i = 0; i < planet.moons; i++) {
    const moon = document.createElement("div");
    moon.classList.add("moon");

    // Randomly position each moon around the planet
    const angle = (i / planet.moons) * 2 * Math.PI;
    const distance = 60 + Math.random() * 50; // distance from planet center
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    moon.style.left = `${50 + x}px`;
    moon.style.top = `${50 + y}px`;

    planetDiv.appendChild(moon);
  }

  // Step 4: Append planet to the section
  section.appendChild(planetDiv);
});
