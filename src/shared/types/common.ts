export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
