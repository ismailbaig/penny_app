import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private username: string | null = null;
  private user_id: string | null = null;
  private email: string | null = null;
  private expirationTime: number | null = null;
  private errorMessage: string = '';

  constructor(private router: Router) {}

  setToken(
    token: string,
    username: string,
    user_id: string,
    expiresIn: number
  ) {
    this.token = token;
    this.username = username;
    this.user_id = user_id;
    this.expirationTime = Date.now() + expiresIn * 1000;
    this.startTokenCheck();
  }

  setEmail(email: string) {
    this.email = email;
  }
  getEmail(): string | null {
    return this.email;
  }

  getToken(): string | null {
    return this.token;
  }

  getUsername(): string | null {
    return this.username;
  }
  getUserId(): string | null {
    return this.user_id;
  }

  clearData() {
    this.token = null;
    this.username = null;
    this.user_id = null;
  }

  private startTokenCheck() {
    if (this.expirationTime) {
      const timeLeft = this.expirationTime - Date.now();
      if (timeLeft > 0) {
        setTimeout(
          () => this.logout('Session expired. Please log in again.'),
          timeLeft
        );
      } else {
        this.logout('Session expired. Please log in again.');
      }
    }
  }

  logout(message: string = '') {
    this.clearData();
    this.errorMessage = message;
    this.router.navigate(['/login']);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
