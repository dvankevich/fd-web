import type { Nullable } from '@shared/types';

export interface Ingredients {
  id: string;
  name: string;
  description: Nullable<string>;
  img: string;
}

export interface IngredientsResponse {
  id: string;
  name: string;
  description: Nullable<string>;
  img: string;
}
