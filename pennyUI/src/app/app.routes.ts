import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login-page/login.component';
import { SignupComponent } from './features/signup/signup-page/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard-page/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
