export interface Option {
  _id: string;
  name: string;
}

export interface Ingredient {
  _id: string;
  name: string;
  img: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  image: string;
  measure: string;
}

export interface RecipeFormValues {
  image: File | null;
  title: string;
  description: string;
  category: string;
  area: string;
  time: number;
  ingredients: RecipeIngredient[];
  instructions: string;
}
