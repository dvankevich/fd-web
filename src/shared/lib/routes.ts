export const ROUTE = {
  home: '/',
  recipe: '/recipe/:id',
  addRecipe: '/recipe/add',
  user: '/user/:id',
  notFound: '*',
} as const;

export type Route = (typeof ROUTE)[keyof typeof ROUTE];

const PARAM_PATTERN = /:([A-Za-z0-9_]+)/g;

export const buildPath = (route: Route, params: Record<string, string> = {}): string =>
  route.replace(PARAM_PATTERN, (token, name: string) => params[name] ?? token);
