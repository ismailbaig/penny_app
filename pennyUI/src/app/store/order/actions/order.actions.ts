import { createAction, props } from '@ngrx/store';

export const loadOrders = createAction(
  '[Order] Load Orders',
  props<{ orders: any[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);

export const clearOrders = createAction('[Order] Clear Orders');
