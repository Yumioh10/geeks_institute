   document.addEventListener('DOMContentLoaded', () => {
   // DOM Element References
      const form = document.getElementById('libform');
      const storySpan = document.getElementById('story');
      const storyOutputDiv = document.getElementById('story-output');
      const shuffleButton = document.getElementById('shuffle-button');
      const errorMessage = document.getElementById('error-message');
         
      // Input Element References
      const nounInput = document.getElementById('noun');
      const adjectiveInput = document.getElementById('adjective');
      const personInput = document.getElementById('person');
      const verbInput = document.getElementById('verb');
      const placeInput = document.getElementById('place');

      // Global variable to store the last successfully submitted values
      let lastSubmittedValues = null;
      // Global array of story templates for the Bonus challenge
      const storyTemplates = [
         // Story 1
         "The {adjective} {noun} ran away when {person} tried to {verb} it. They later found it hiding in the dark corner of the {place}, giggling maniacally.",
         // Story 2
         "I was sitting next to a {adjective} {noun} on a bus heading toward the city of {place}, when suddenly {person} stood up and started to {verb} loudly. Everyone clapped.",
         // Story 3
         "Every morning, the dedicated explorer {person} wakes up and attempts to {verb} their {adjective} {noun} before heading to the amazing {place} to begin the day's research.",
         // Story 4 (Extra option)
         "A wild {adjective} {noun} appeared in the {place}. Trainer {person} commanded it to {verb}, but it just yawned and demanded a nap."
      ];
         
         // --- Core Functions ---
      /**
      * 2. Checks if all inputs have values.
      * @param {Object} values - Object containing all input values.
      * @returns {boolean} True if all values are non-empty strings.
      */
      function validateInputs(values) {
         return Object.values(values).every(value => value.trim() !== '');
      }

      /**
      * 3. Writes a story using the provided values and displays it.
      * @param {Object} values - Contains {noun, adjective, person, verb, place}
      * @param {string} template - The story template string to use.
      */
      function generateStory(values, template) {
         let story = template;
               
         // Replace placeholders in the template with user-provided words
         story = story.replace(/{noun}/g, values.noun);
         story = story.replace(/{adjective}/g, values.adjective);
         story = story.replace(/{person}/g, values.person);
         story = story.replace(/{verb}/g, values.verb);
         story = story.replace(/{place}/g, values.place);

         // Display the final story
         storySpan.textContent = story;
         storyOutputDiv.classList.remove('hidden');
         shuffleButton.classList.remove('hidden');
      }

      /**
      * Bonus: Randomly selects and displays a new story using the last successful values.
      */
      function shuffleStory() {
         if (!lastSubmittedValues) return;
         // Generate a random index, ensuring it's different from the current story index if possible
         const currentIndex = storyTemplates.indexOf(storySpan.dataset.currentTemplate);
         let newIndex = currentIndex;
               
         // Loop until a new index is found, or if there's only one story available
         while (newIndex === currentIndex && storyTemplates.length > 1) {
            newIndex = Math.floor(Math.random() * storyTemplates.length);
         }
               
         const newTemplate = storyTemplates[newIndex];
               
         // Store the template used so we can avoid repeating it immediately
         storySpan.dataset.currentTemplate = newTemplate;
         generateStory(lastSubmittedValues, newTemplate);
      }
         
      // --- Event Listeners ---
         
      // 1. Get the value of each of the inputs when the form is submitted.
      form.addEventListener('submit', function(event) {
         // 1. Remember the event.preventDefault().
         // This stops the default browser action (page reload/navigation)
         event.preventDefault(); 
               
         // 4. Check console for errors (the console.log below helps debugging)
         console.log('Form submission attempted.');

         // Get values
         const values = {
            noun: nounInput.value,
            adjective: adjectiveInput.value,
            person: personInput.value,
            verb: verbInput.value,
            place: placeInput.value
         };

         // 2. Make sure the values are not empty
         if (!validateInputs(values)) {
            errorMessage.classList.remove('hidden');
            storyOutputDiv.classList.add('hidden');
            shuffleButton.classList.add('hidden');
            return;
         }

         // Clear error message on successful validation
         errorMessage.classList.add('hidden');
                  
         // Store successful values for the shuffle bonus
         lastSubmittedValues = values;

         // 3. Write and display the initial story. Start with the first template.
         const initialTemplate = storyTemplates[0];
         storySpan.dataset.currentTemplate = initialTemplate; // Track which template is currently used
         generateStory(values, initialTemplate);
      });

      // 5. Bonus: Add event listener to the "Shuffle" button
      shuffleButton.addEventListener('click', shuffleStory);
            
      // Initialize inputs with focus styling
      document.querySelectorAll('.input-field').forEach(input => {
         input.classList.add('px-4', 'py-2', 'border', 'border-gray-300', 'rounded-lg', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'transition', 'duration-150', 'w-full');
      });
   });