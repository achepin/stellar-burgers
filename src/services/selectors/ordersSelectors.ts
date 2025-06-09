import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Базовый селектор для состояния заказов
export const selectOrdersState = (state: RootState) => state.orders;

// Мемоизированные селекторы
export const selectOrders = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.orders
);

export const selectUserOrders = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.userOrders
);

export const selectCurrentOrder = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.currentOrder
);

export const selectOrdersLoading = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.loading
);

export const selectOrdersError = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.error
);

export const selectTotal = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.total
);

export const selectTotalToday = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.totalToday
);

// Селекторы для фильтрации заказов по статусу
export const selectOrdersByStatus = createSelector(
  [selectOrders, (state: RootState, status: string) => status],
  (orders, status) => orders.filter((order) => order.status === status)
);

export const selectReadyOrders = createSelector([selectOrders], (orders) =>
  orders.filter((order) => order.status === 'done')
);

export const selectPendingOrders = createSelector([selectOrders], (orders) =>
  orders.filter((order) => order.status === 'pending')
);
