import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from '../reducer/counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('count');

export const selectCounterValue = createSelector(
  selectCounterState,
  (state: CounterState) => state.count
);
