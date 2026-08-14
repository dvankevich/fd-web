import { configureStore } from '@reduxjs/toolkit';

// TODO: підключати reducers з features (auth, recipes тощо)
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // recipes: recipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
