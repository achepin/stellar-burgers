import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Базовый селектор для состояния ингредиентов
export const selectIngredientsState = (state: RootState) => state.ingredients;

// Мемоизированные селекторы
export const selectIngredients = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.ingredients
);

export const selectIngredientsLoading = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.loading
);

export const selectIngredientsError = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.error
);

// Селекторы для фильтрации ингредиентов по типам
export const selectBuns = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'bun')
);

export const selectMains = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'main')
);

export const selectSauces = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'sauce')
);

// Селектор для поиска ингредиента по ID
export const selectIngredientById = createSelector(
  [selectIngredients, (state: RootState, id: string) => id],
  (ingredients, id) => ingredients.find((ingredient) => ingredient._id === id)
);
