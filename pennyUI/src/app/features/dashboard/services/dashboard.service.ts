import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'pennyUI/src/app/core/authentication/auth.service';
import { environment } from 'pennyUI/src/environments/environment.dev';
import { Observable } from 'rxjs';
import { DashboardDataModel } from '../models/dashboard-data.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  token: string | null = '';
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getDashboardData(): Observable<DashboardDataModel> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<DashboardDataModel>(this._baseUrl + 'api/dashboard', { headers });
  }

  public getOrders(email:string): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this._baseUrl}orders/gtuo/${email}`);
  }
}
