// src/templates/RecipeTemplate.ts

import { RecipeItem } from '../model/RecipeItem';
import { RecipeCollection } from '../model/RecipeCollection';

/**
 * RecipeTemplate handles all DOM rendering for recipes
 * Uses Tailwind CSS utility classes for styling
 */
export class RecipeTemplate {
  private container: HTMLElement;
  private collection: RecipeCollection;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = element;
    this.collection = RecipeCollection.getInstance();
  }

  /**
   * Render all recipes in the collection
   */
  render(): void {
    this.container.innerHTML = '';
    const recipes = this.collection.recipes;

    if (recipes.length === 0) {
      this.renderEmptyState();
      return;
    }

    recipes.forEach(recipe => {
      const recipeCard = this.createRecipeCard(recipe);
      this.container.appendChild(recipeCard);
    });
  }

  /**
   * Create a complete recipe card element with Tailwind styling
   */
  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('div');
    card.className = 'recipe-card bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 transform hover:-translate-y-1';
    card.dataset.recipeId = recipe.id;

    const header = this.createCardHeader(recipe);
    const content = this.createCardContent(recipe);
    const actions = this.createCardActions(recipe);

    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(actions);

    // Initially hide content
    content.classList.add('hidden');

    return card;
  }

  /**
   * Create card header with title and toggle button
   */
  private createCardHeader(recipe: RecipeItem): HTMLElement {
    const header = document.createElement('div');
    header.className = 'flex justify-between items-start gap-4 mb-4';

    // Title with favorite indicator
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'flex items-center gap-3 flex-1';

    if (recipe.isFavorite) {
      const favoriteIcon = document.createElement('span');
      favoriteIcon.className = 'text-2xl animate-pulse';
      favoriteIcon.textContent = '❤️';
      titleWrapper.appendChild(favoriteIcon);
    }

    const title = document.createElement('h3');
    title.className = 'text-2xl font-bold text-gray-800 leading-tight';
    title.textContent = recipe.title;
    titleWrapper.appendChild(title);

    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 transform hover:scale-105 whitespace-nowrap text-sm shadow-md hover:shadow-lg flex items-center gap-2';
    toggleBtn.innerHTML = '<span>👁️</span><span>Show</span>';
    toggleBtn.onclick = () => this.toggleDetails(recipe.id);

    header.appendChild(titleWrapper);
    header.appendChild(toggleBtn);

    return header;
  }

  /**
   * Create card content with ingredients and instructions
   */
  private createCardContent(recipe: RecipeItem): HTMLElement {
    const content = document.createElement('div');
    content.className = 'mt-6 pt-6 border-t-2 border-purple-200 space-y-5 animate-fade-in';
    content.id = `content-${recipe.id}`;

    // Ingredients section
    const ingredientsSection = document.createElement('div');
    ingredientsSection.className = 'bg-white rounded-xl p-5 shadow-sm border border-purple-100';

    const ingredientsHeader = document.createElement('div');
    ingredientsHeader.className = 'flex items-center gap-2 mb-4';
    
    const ingredientsIcon = document.createElement('span');
    ingredientsIcon.className = 'text-2xl';
    ingredientsIcon.textContent = '🥘';
    
    const ingredientsTitle = document.createElement('h4');
    ingredientsTitle.className = 'text-lg font-bold text-purple-700';
    ingredientsTitle.textContent = 'Ingredients';
    
    ingredientsHeader.appendChild(ingredientsIcon);
    ingredientsHeader.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(ingredientsHeader);

    const ingredientsList = document.createElement('ul');
    ingredientsList.className = 'space-y-2.5 ml-1';
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement('li');
      li.className = 'text-gray-700 flex items-start gap-3 group';
      
      const bullet = document.createElement('span');
      bullet.className = 'text-purple-500 font-bold mt-0.5 group-hover:scale-125 transition-transform';
      bullet.textContent = '•';
      
      const text = document.createElement('span');
      text.className = 'flex-1';
      text.textContent = ingredient;
      
      li.appendChild(bullet);
      li.appendChild(text);
      ingredientsList.appendChild(li);
    });
    ingredientsSection.appendChild(ingredientsList);

    // Instructions section
    const instructionsSection = document.createElement('div');
    instructionsSection.className = 'bg-white rounded-xl p-5 shadow-sm border border-purple-100';

    const instructionsHeader = document.createElement('div');
    instructionsHeader.className = 'flex items-center gap-2 mb-4';
    
    const instructionsIcon = document.createElement('span');
    instructionsIcon.className = 'text-2xl';
    instructionsIcon.textContent = '📝';
    
    const instructionsTitle = document.createElement('h4');
    instructionsTitle.className = 'text-lg font-bold text-purple-700';
    instructionsTitle.textContent = 'Instructions';
    
    instructionsHeader.appendChild(instructionsIcon);
    instructionsHeader.appendChild(instructionsTitle);
    instructionsSection.appendChild(instructionsHeader);

    const instructionsText = document.createElement('p');
    instructionsText.className = 'text-gray-700 leading-relaxed whitespace-pre-wrap';
    instructionsText.textContent = recipe.instructions;
    instructionsSection.appendChild(instructionsText);

    content.appendChild(ingredientsSection);
    content.appendChild(instructionsSection);

    return content;
  }

  /**
   * Create action buttons (favorite and delete)
   */
  private createCardActions(recipe: RecipeItem): HTMLElement {
    const actions = document.createElement('div');
    actions.className = 'flex gap-3 mt-5 flex-wrap';

    // Favorite button with dynamic styling
    const favoriteBtn = document.createElement('button');
    const isFavorite = recipe.isFavorite;
    
    favoriteBtn.className = isFavorite 
      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-md hover:shadow-lg'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-sm hover:shadow-md border-2 border-gray-200';
    
    const favoriteIcon = document.createElement('span');
    favoriteIcon.className = 'text-lg';
    favoriteIcon.textContent = isFavorite ? '❤️' : '🤍';
    
    const favoriteText = document.createElement('span');
    favoriteText.textContent = isFavorite ? 'Favorited' : 'Add Favorite';
    
    favoriteBtn.appendChild(favoriteIcon);
    favoriteBtn.appendChild(favoriteText);
    favoriteBtn.onclick = () => this.handleFavorite(recipe.id);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'bg-gray-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white text-red-600 font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-sm hover:shadow-lg border-2 border-gray-200 hover:border-red-500';
    
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'text-lg';
    deleteIcon.textContent = '🗑️';
    
    const deleteText = document.createElement('span');
    deleteText.textContent = 'Delete';
    
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(deleteText);
    deleteBtn.onclick = () => this.handleDelete(recipe.id);

    actions.appendChild(favoriteBtn);
    actions.appendChild(deleteBtn);

    return actions;
  }

  /**
   * Render empty state when no recipes exist
   */
  private renderEmptyState(): void {
    const emptyState = document.createElement('div');
    emptyState.className = 'text-center py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-dashed border-purple-300';
    
    const icon = document.createElement('div');
    icon.className = 'text-7xl mb-6 animate-bounce';
    icon.textContent = '📖';
    
    const title = document.createElement('p');
    title.className = 'text-2xl text-gray-700 font-bold mb-3';
    title.textContent = 'No recipes yet!';
    
    const subtitle = document.createElement('p');
    subtitle.className = 'text-lg text-gray-500';
    subtitle.textContent = 'Add your first recipe above to get started.';
    
    emptyState.appendChild(icon);
    emptyState.appendChild(title);
    emptyState.appendChild(subtitle);
    
    this.container.appendChild(emptyState);
  }

  /**
   * Toggle recipe details visibility with smooth animation
   */
  private toggleDetails(id: string): void {
    const content = document.getElementById(`content-${id}`);
    const card = document.querySelector(`[data-recipe-id="${id}"]`);
    const toggleBtn = card?.querySelector('button') as HTMLButtonElement;

    if (content && toggleBtn) {
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        toggleBtn.innerHTML = '<span>👁️‍🗨️</span><span>Hide</span>';
        toggleBtn.classList.add('bg-purple-600');
        toggleBtn.classList.remove('bg-purple-500');
      } else {
        content.classList.add('hidden');
        toggleBtn.innerHTML = '<span>👁️</span><span>Show</span>';
        toggleBtn.classList.remove('bg-purple-600');
        toggleBtn.classList.add('bg-purple-500');
      }
    }
  }

  /**
   * Handle favorite toggle action
   */
  private handleFavorite(id: string): void {
    this.collection.toggleFavorite(id);
    this.render();
  }

  /**
   * Handle recipe deletion with confirmation
   */
  private handleDelete(id: string): void {
    const recipe = this.collection.getRecipeById(id);
    const recipeName = recipe ? recipe.title : 'this recipe';
    
    if (confirm(`Are you sure you want to delete "${recipeName}"? This action cannot be undone.`)) {
      this.collection.removeRecipe(id);
      this.render();
    }
  }
}