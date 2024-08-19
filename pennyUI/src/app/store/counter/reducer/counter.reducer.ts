import { createReducer, on } from '@ngrx/store';
import {
  loadCount,
  loadCountFailure,
  loadCountSuccess,
} from '../actions/counter.actions';

export interface CounterState {
  count: number;
  error: any;
  loading: boolean;
}

export const initialState: CounterState = {
  count: 0,
  error: null,
  loading: false,
};

export const counterReducer = createReducer(
  initialState,
  on(loadCountSuccess, (state, { count }) => ({
    ...state,
    count,
    loading: false,
    error: null,
  })),
  on(loadCountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadCount, (state) => ({ ...state, loading: true }))
);
