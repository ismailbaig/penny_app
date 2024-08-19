import { provideStore } from '@ngrx/store';
import { orderReducer } from './order/reducer/order.reducer';


export const appStoreProviders = [
    provideStore({ order: orderReducer }),
];
