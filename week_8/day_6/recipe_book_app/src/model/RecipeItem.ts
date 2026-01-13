/**
 * Interface defining the structure of a recipe item
 */
export default interface IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

/**
 * RecipeItem class represents a single recipe with all its properties
 * Uses private fields with getters/setters for encapsulation
 */
export class RecipeItem implements IRecipeItem {
  private _id: string;
  private _title: string;
  private _ingredients: string[];
  private _instructions: string;
  private _isFavorite: boolean;

  constructor(
    id: string = '',
    title: string = '',
    ingredients: string[] = [],
    instructions: string = '',
    isFavorite: boolean = false
  ) {
    this._id = id;
    this._title = title;
    this._ingredients = ingredients;
    this._instructions = instructions;
    this._isFavorite = isFavorite;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get ingredients(): string[] {
    return this._ingredients;
  }

  get instructions(): string {
    return this._instructions;
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  // Setters
  set id(id: string) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set ingredients(ingredients: string[]) {
    this._ingredients = ingredients;
  }

  set instructions(instructions: string) {
    this._instructions = instructions;
  }

  set isFavorite(isFavorite: boolean) {
    this._isFavorite = isFavorite;
  }

  /**
   * Toggle the favorite status of the recipe
   */
  toggleFavorite(): void {
    this._isFavorite = !this._isFavorite;
  }

  /**
   * Convert the recipe to a plain JSON object for storage
   */
  toJSON(): IRecipeItem {
    return {
      id: this._id,
      title: this._title,
      ingredients: this._ingredients,
      instructions: this._instructions,
      isFavorite: this._isFavorite
    };
  }
}

