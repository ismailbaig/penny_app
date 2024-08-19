import { createAction, props } from '@ngrx/store';

export const loadCount = createAction('[Counter] Load Count');
export const loadCountSuccess = createAction(
  '[Counter] Load Count Success',
  props<{ count: number }>()
);
export const loadCountFailure = createAction(
  '[Counter] Load Count Failure',
  props<{ error: any }>()
);
