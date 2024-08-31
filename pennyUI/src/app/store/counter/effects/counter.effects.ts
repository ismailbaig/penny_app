import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  loadCount,
  loadCountFailure,
  loadCountSuccess,
} from '../actions/counter.actions';
import { DashBoardService } from 'pennyUI/src/app/features/dashboard/services/dashboard.service';
@Injectable()
export class CounterEffects {
//   loadCount$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadCount),
//       mergeMap(() =>
//         this.dashboardService.getDashboardData().pipe(
//           map((count) => loadCountSuccess({ count })),
//           catchError((error) => of(loadCountFailure({ error })))
//         )
//       )
//     )
//   );

  constructor(
    private actions$: Actions,
    private dashboardService: DashBoardService
  ) {
    console.log('Actions:', this.actions$); // Should not be undefined
    console.log('Dashboard Service:', this.dashboardService); // Should not be undefined
  }
}
