import { RecipeItem } from './RecipeItem';

/**
 * RecipeCollection manages all recipes in the application
 * Implements Singleton pattern to ensure only one instance exists
 * Handles localStorage persistence automatically
 */
export class RecipeCollection {
  private static instance: RecipeCollection;
  private _recipes: RecipeItem[];
  private static readonly STORAGE_KEY = 'recipeBookData';

  private constructor() {
    this._recipes = this.loadFromStorage();
  }

  /**
   * Get the singleton instance of RecipeCollection
   */
  static getInstance(): RecipeCollection {
    if (!RecipeCollection.instance) {
      RecipeCollection.instance = new RecipeCollection();
    }
    return RecipeCollection.instance;
  }

  /**
   * Get all recipes in the collection
   */
  get recipes(): RecipeItem[] {
    return this._recipes;
  }

  /**
   * Get the total number of recipes
   */
  get count(): number {
    return this._recipes.length;
  }

  /**
   * Add a new recipe to the collection
   * Automatically saves to localStorage
   */
  addRecipe(recipe: RecipeItem): void {
    this._recipes.push(recipe);
    this.saveToStorage();
  }

  /**
   * Remove a recipe by its ID
   * Returns true if recipe was found and removed
   */
  removeRecipe(id: string): boolean {
    const initialLength = this._recipes.length;
    this._recipes = this._recipes.filter(recipe => recipe.id !== id);
    
    if (this._recipes.length < initialLength) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Find a recipe by its ID
   * Returns undefined if not found
   */
  getRecipeById(id: string): RecipeItem | undefined {
    return this._recipes.find(recipe => recipe.id === id);
  }

  /**
   * Toggle the favorite status of a recipe
   */
  toggleFavorite(id: string): void {
    const recipe = this.getRecipeById(id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveToStorage();
    }
  }

  /**
   * Get all recipes marked as favorite
   */
  getFavoriteRecipes(): RecipeItem[] {
    return this._recipes.filter(recipe => recipe.isFavorite);
  }

  /**
   * Remove all recipes from the collection
   */
  clearAll(): void {
    this._recipes = [];
    this.saveToStorage();
  }

  /**
   * Save all recipes to localStorage
   * Private method - called automatically when collection changes
   */
  private saveToStorage(): void {
    try {
      const data = this._recipes.map(recipe => recipe.toJSON());
      localStorage.setItem(RecipeCollection.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Could show a toast notification to user here
    }
  }

  /**
   * Load recipes from localStorage
   * Private method - called automatically on initialization
   */
  private loadFromStorage(): RecipeItem[] {
    try {
      const data = localStorage.getItem(RecipeCollection.STORAGE_KEY);
      if (data) {
        const parsedData: any[] = JSON.parse(data);
        return parsedData.map(item => 
          new RecipeItem(
            item.id,
            item.title,
            item.ingredients,
            item.instructions,
            item.isFavorite
          )
        );
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      // Could show a toast notification to user here
    }
    return [];
  }

  /**
   * Update an existing recipe
   * Returns true if recipe was found and updated
   */
  updateRecipe(id: string, updatedData: Partial<RecipeItem>): boolean {
    const recipe = this.getRecipeById(id);
    if (recipe) {
      if (updatedData.title !== undefined) recipe.title = updatedData.title;
      if (updatedData.ingredients !== undefined) recipe.ingredients = updatedData.ingredients;
      if (updatedData.instructions !== undefined) recipe.instructions = updatedData.instructions;
      if (updatedData.isFavorite !== undefined) recipe.isFavorite = updatedData.isFavorite;
      
      this.saveToStorage();
      return true;
    }
    return false;
  }
}