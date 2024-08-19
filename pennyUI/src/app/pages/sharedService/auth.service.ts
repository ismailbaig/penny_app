import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private username: string | null = null;
  private user_id: string | null = null;
  private email: string | null = null;

  setToken(token: string,username: string,user_id: string) {
    this.token = token;
    this.username = username;
    this.user_id = user_id;
  }

  setEmail(email:string){
    this.email=email;
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
}
