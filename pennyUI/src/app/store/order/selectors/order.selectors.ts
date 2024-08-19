import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState } from '../reducer/order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);

export const selectNoRecordsFound = createSelector(
  selectOrderState,
  (state: OrderState) => state.noRecordsFound
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error
);
