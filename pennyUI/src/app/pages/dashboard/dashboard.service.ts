import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { LoginService } from '../login/login.service';
import { AuthService } from '../sharedService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  token: string | null = '';
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getDashboardData(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this._baseUrl + 'api/dashboard', { headers });
  }

  public getOrders(email:string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}orders/gtuo/${email}`);
  }
}
