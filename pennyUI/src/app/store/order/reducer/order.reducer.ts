import { createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';

export interface OrderState {
  orders: any[];
  noRecordsFound: boolean;
  error: any | null;
}

export const initialState: OrderState = {
  orders: [],
  noRecordsFound: false,
  error: null,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state, { orders }) => ({
    ...state,
    orders,
    noRecordsFound: orders.length === 0,
    error: null,
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    orders: [],
    noRecordsFound: true,
    error,
  })),
  on(OrderActions.clearOrders, (state) => initialState)
);
