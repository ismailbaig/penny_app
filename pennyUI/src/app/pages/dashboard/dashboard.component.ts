import { Component, OnInit } from '@angular/core';
import { DashBoardService } from './dashboard.service';
import { Router } from '@angular/router';
import { AuthService } from '../sharedService/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../store/order/actions/order.actions';
import {
  selectOrders,
  selectNoRecordsFound,
  selectOrderError,
} from '../../store/order/selectors/order.selectors';
import { FormsModule } from '@angular/forms';

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
    this.authService.clearData();
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
          } else {
            this.store.dispatch(OrderActions.loadOrders({ orders: res }));
          }
        },
        (error) => {
          console.error('Error fetching orders:', error);
          this.store.dispatch(OrderActions.loadOrdersFailure({ error }));
        }
      );
    }
  }
}
