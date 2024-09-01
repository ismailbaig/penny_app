import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../../store/order/actions/order.actions';
import {
  selectOrders,
  selectNoRecordsFound,
  selectOrderError,
} from '../../../store/order/selectors/order.selectors';
import { FormsModule } from '@angular/forms';
import { DashBoardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  user_id: string | null = '';
  noRecordsFound: boolean = false;
  orders: any = [];
  orders$;
  noRecordsFound$;
  error$;
  constructor(
    private dashboardService: DashBoardService,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {
    this.orders$ = this.store.select(selectOrders);
    this.noRecordsFound$ = this.store.select(selectNoRecordsFound);
    this.error$ = this.store.select(selectOrderError);
  }
  ngOnInit(): void {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
    }
    this.dashboardService.getDashboardData().subscribe(
      (res) => {
        this.username = this.authService.getUsername();
        this.user_id = this.authService.getUserId();
      },
      (err) => {
        this.router.navigate(['login']);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(OrderActions.clearOrders());
    this.router.navigate(['login']);
  }

  fetchOrders() {
    const email = this.authService.getEmail();
    if (email) {
      this.dashboardService.getOrders(email).subscribe(
        (res) => {
          if (res.length === 0) {
            this.store.dispatch(OrderActions.loadOrders({ orders: [] }));
            this.noRecordsFound = true;
            this.orders = [];
          } else {
            this.store.dispatch(OrderActions.loadOrders({ orders: res }));
            this.orders = res;
            this.noRecordsFound = false;
          }
        },
        (error) => {
          console.error('Error fetching orders:', error);
          this.store.dispatch(OrderActions.loadOrdersFailure({ error }));
          this.noRecordsFound = true;
        }
      );
    }
  }
}
