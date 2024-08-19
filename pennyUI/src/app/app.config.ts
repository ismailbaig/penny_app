import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { appStoreProviders } from './store/store.config';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { provideEffects } from '@ngrx/effects';
import { CounterEffects } from './store/counter/effects/counter.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ...appStoreProviders,
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
    provideEffects([CounterEffects])
  ],
};
