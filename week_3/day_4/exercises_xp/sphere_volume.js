// Get necessary elements
let form = document.getElementById('MyForm');
let radiusInput = document.getElementById('radius');
let volumeInput = document.getElementById('volume');
let errorMessage = document.getElementById('calc-error');

// Function to calculate and display the sphere volume
function calculateVolume(event) {
// Prevent the default form submission behavior (page reload)
   event.preventDefault(); 
            
// Clear previous errors
   errorMessage.classList.add('hidden');
   volumeInput.value = '';

// Get the input value and convert it to a floating-point number
   let radius = parseFloat(radiusInput.value);

// Input validation: ensure it's a valid, positive number
   if (isNaN(radius) || radius <= 0) {
      errorMessage.classList.remove('hidden');
      volumeInput.value = 'Error';
      return;
   }

// Formula for the volume of a sphere: V = (4/3) * PI * r^3
// Math.pow(radius, 3) calculates r^3
   let volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

// Display the result in the volume input field, rounded to 4 decimal places
   volumeInput.value = volume.toFixed(4);
}

// Attach the event listener to the form submission
form.addEventListener('submit', calculateVolume);

console.log('JavaScript program loaded: Sphere volume calculator ready.');