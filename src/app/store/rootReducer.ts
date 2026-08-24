import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { AUTH_PERSIST, AUTH_PERSISTED_KEYS, authReducer } from '@features/auth';
import { categoriesReducer } from '@features/categories';
import { areasReducer } from '@features/areas';
import { ingredientsReducer } from '@features/ingredients';
import { recipesReducer } from '@features/recipes/slice';
import { userReducer } from '@/features/user/slice';

const customStorage = {
  getItem: (key: string) =>
    Promise.resolve(typeof window !== 'undefined' ? localStorage.getItem(key) : null),
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
    return Promise.resolve();
  },
};

// Конфіги для збереження довідників
const authPersistConfig = {
  key: AUTH_PERSIST.key,
  storage: customStorage,
  whitelist: [...AUTH_PERSISTED_KEYS],
};

const categoriesPersistConfig = {
  key: 'categories',
  storage: customStorage,
  whitelist: ['items'],
};

const areasPersistConfig = {
  key: 'areas',
  storage: customStorage,
  whitelist: ['items'],
};

const ingredientsPersistConfig = {
  key: 'ingredients',
  storage: customStorage,
  whitelist: ['items'],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  categories: persistReducer(categoriesPersistConfig, categoriesReducer),
  areas: persistReducer(areasPersistConfig, areasReducer),
  ingredients: persistReducer(ingredientsPersistConfig, ingredientsReducer),
  recipes: recipesReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
