export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  instructions: string;
  time: number;
  category: string;
  thumb?: string;
  ingredients: RecipeIngredient[];
  owner: User;
}

export interface RecipeIngredient {
  id: string;
  measure: string;
  name?: string;
  img?: string;
}
