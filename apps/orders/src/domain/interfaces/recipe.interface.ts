export interface IIngredient {
  name: string;
  quantity: number;
}

export interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
}
