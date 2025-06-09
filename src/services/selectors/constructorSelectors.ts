import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Базовый селектор для состояния конструктора
export const selectConstructorState = (state: RootState) =>
  state.burgerConstructor;

// Мемоизированные селекторы
export const selectConstructorBun = createSelector(
  [selectConstructorState],
  (constructorState) => constructorState.bun
);

export const selectConstructorIngredients = createSelector(
  [selectConstructorState],
  (constructorState) => constructorState.ingredients
);

// Селектор для всех элементов конструктора
export const selectConstructorItems = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => ({
    bun,
    ingredients: ingredients || []
  })
);

// Селектор для подсчета общей стоимости бургера
export const selectConstructorTotalPrice = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients
      ? ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
      : 0;
    return bunPrice + ingredientsPrice;
  }
);

// Селектор для проверки, можно ли создать заказ
export const selectCanCreateOrder = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => !!bun && ingredients && ingredients.length > 0
);
