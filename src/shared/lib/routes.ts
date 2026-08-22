import type { ValueOf } from '@shared/types';

export const ROUTE = {
  home: '/',
  recipes: '/recipes',
  recipe: '/recipe/:id',
  addRecipe: '/recipe/add',
  user: '/user/:id',
  notFound: '*',
} as const;

export type Route = ValueOf<typeof ROUTE>;

export type ParamRoute = Extract<Route, `${string}:${string}`>;

export type StaticRoute = Exclude<Route, ParamRoute | typeof ROUTE.notFound>;

type PathParam<R extends string> = R extends `${string}:${infer Param}/${infer Rest}`
  ? Param | PathParam<Rest>
  : R extends `${string}:${infer Param}`
    ? Param
    : never;

type PathArgs<R extends string> = [PathParam<R>] extends [never]
  ? []
  : [params: Record<PathParam<R>, string>];

const PARAM_PATTERN = /:([A-Za-z0-9_]+)/g;

export const buildPath = <R extends StaticRoute | ParamRoute>(
  route: R,
  ...args: PathArgs<R>
): string => {
  const [params] = args;
  if (!params) {
    return route;
  }

  const values = new Map<string, string>(Object.entries(params));
  const path = route.replace(PARAM_PATTERN, (token, name: string) => values.get(name) ?? token);

  if (path.includes(':')) {
    throw new Error(`buildPath: unresolved parameter in ${route}`);
  }

  return path;
};
