import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Базовый селектор для состояния пользователя
export const selectUserState = (state: RootState) => state.user;

// Мемоизированные селекторы
export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectIsAuthChecked = createSelector(
  [selectUserState],
  (userState) => userState.isAuthChecked
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export const selectIsAuthenticated = createSelector(
  [selectUser],
  (user) => !!user
);
