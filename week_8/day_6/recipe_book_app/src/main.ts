// src/main.ts
import './style.css';
import { RecipeItem } from './model/RecipeItem';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

/**
 * Generate a unique ID for recipes
 * Uses timestamp and random string for uniqueness
 */
function generateUniqueId(): string {
  return `recipe-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Show a toast notification to the user
 */
function showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
  // Create toast element
  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
  
  toast.className = `fixed top-4 right-4 ${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ease-out z-50 flex items-center gap-3 font-semibold`;
  toast.style.transform = 'translateX(400px)';
  
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span class="text-xl">${icon}</span><span>${message}</span>`;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

/**
 * Validate form inputs
 */
function validateInputs(title: string, ingredients: string, instructions: string): string | null {
  if (!title.trim()) {
    return 'Please enter a recipe title';
  }
  if (title.trim().length < 3) {
    return 'Recipe title must be at least 3 characters';
  }
  if (!ingredients.trim()) {
    return 'Please enter at least one ingredient';
  }
  if (!instructions.trim()) {
    return 'Please enter cooking instructions';
  }
  if (instructions.trim().length < 10) {
    return 'Instructions must be at least 10 characters';
  }
  return null;
}

/**
 * Initialize the Recipe Book application
 */
function initApp(): void {
  // Get singleton instance of collection and create template renderer
  const collection = RecipeCollection.getInstance();
  const template = new RecipeTemplate('recipeContainer');

  // Initial render of existing recipes
  template.render();

  // Get form elements with proper type casting
  const form = document.getElementById('recipeEntryForm') as HTMLFormElement;
  const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
  const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
  const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;
  const clearButton = document.getElementById('clearRecipesButton') as HTMLButtonElement;

  // Add visual feedback when typing
  const inputs = [titleInput, ingredientsInput, instructionsInput];
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.add('ring-4', 'ring-purple-200', 'border-purple-500');
    });
    input.addEventListener('blur', () => {
      input.classList.remove('ring-4', 'ring-purple-200');
    });
  });

  /**
   * Handle form submission
   */
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const ingredientsText = ingredientsInput.value.trim();
    const instructions = instructionsInput.value.trim();

    // Validate inputs
    const validationError = validateInputs(title, ingredientsText, instructions);
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    // Parse ingredients (one per line, filter empty lines)
    const ingredients = ingredientsText
      .split('\n')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);

    if (ingredients.length === 0) {
      showToast('Please enter at least one ingredient', 'error');
      return;
    }

    // Create new recipe instance
    const newRecipe = new RecipeItem(
      generateUniqueId(),
      title,
      ingredients,
      instructions,
      false
    );

    // Add to collection (automatically saves to localStorage)
    collection.addRecipe(newRecipe);

    // Re-render the recipe list
    template.render();

    // Clear form and show success message
    form.reset();
    titleInput.focus();
    showToast(`Recipe "${title}" added successfully!`, 'success');

    // Update clear button state
    updateClearButton();
  });

  /**
   * Handle clear all recipes button
   */
  clearButton.addEventListener('click', () => {
    if (collection.count === 0) {
      showToast('No recipes to clear!', 'info');
      return;
    }

    // Custom confirmation dialog
    const confirmMessage = `Are you sure you want to delete all ${collection.count} recipe${collection.count > 1 ? 's' : ''}? This action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
      const count = collection.count;
      collection.clearAll();
      template.render();
      updateClearButton();
      showToast(`All ${count} recipes have been deleted`, 'success');
    }
  });

  /**
   * Update clear button state based on recipe count
   */
  function updateClearButton(): void {
    if (collection.count === 0) {
      clearButton.disabled = true;
      clearButton.classList.add('opacity-50', 'cursor-not-allowed');
      clearButton.classList.remove('hover:bg-red-600', 'transform', 'hover:scale-105');
    } else {
      clearButton.disabled = false;
      clearButton.classList.remove('opacity-50', 'cursor-not-allowed');
      clearButton.classList.add('hover:bg-red-600', 'transform', 'hover:scale-105');
    }
  }

  // Initial button state
  updateClearButton();

  // Monitor recipe container changes to update button state
  const observer = new MutationObserver(() => {
    updateClearButton();
  });

  const container = document.getElementById('recipeContainer');
  if (container) {
    observer.observe(container, { childList: true, subtree: true });
  }

  // Display welcome message on first load
  if (collection.count === 0) {
    setTimeout(() => {
      showToast('Welcome to Recipe Book! Add your first recipe to get started.', 'info');
    }, 500);
  } else {
    showToast(`Loaded ${collection.count} recipe${collection.count > 1 ? 's' : ''} from storage`, 'info');
  }

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    // Ctrl/Cmd + K to focus title input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      titleInput.focus();
    }
  });

  console.log('🎉 Recipe Book Application initialized successfully!');
  console.log(`📚 Current recipes: ${collection.count}`);
}

/**
 * Wait for DOM to be fully loaded before initializing
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}