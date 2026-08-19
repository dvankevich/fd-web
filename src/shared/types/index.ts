import type { Nullable } from './common';

export type { Nullable, Optional, Maybe, ValueOf, Paginated } from './common';

// ===== Auth =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: Nullable<string>;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ===== Current user =====
export interface CurrentUser extends User {
  createdRecipesCount: number;
  favoritesCount: number;
  followersCount: number;
  followingCount: number;
}

// ===== Dictionaries =====
export interface Category {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  description: Nullable<string>;
  img: Nullable<string>;
}

// ===== Recipes  =====
export interface RecipeListItem {
  id: string;
  title: string;
  description: Nullable<string>;
  thumb: Nullable<string>;
  time: Nullable<string>;
  category: Category;
  area: Area;
  owner: {
    id: string;
    name: string;
    avatar: Nullable<string>;
  };
}
