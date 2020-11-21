import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This simply a test',
      'https://p1.pxfuel.com/preview/949/796/952/food-recipe-delicious-breakfast-lunch-dinner.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
      'second recipe',
      'This simply a test2222',
      'https://p1.pxfuel.com/preview/949/796/952/food-recipe-delicious-breakfast-lunch-dinner.jpg',
      [new Ingredient('Bun', 15), new Ingredient('Meat', 5)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);

    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    console.log('here');
    console.log(newRecipe);
    this.recipes[index] = newRecipe;

    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
}
