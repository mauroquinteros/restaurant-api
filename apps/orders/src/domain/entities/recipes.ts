import { IRecipe } from '../interfaces';

export class Recipes {
  static getRandomRecipes(quantity: number, recipes: IRecipe[]) {
    const randomRecipes: IRecipe[] = [];

    if (recipes.length > 0) {
      for (let i = 0; i < quantity; i++) {
        const randomValue = Math.floor(Math.random() * recipes.length);
        randomRecipes.push(recipes[randomValue]);
      }
    }

    return randomRecipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
    }));
  }
}
