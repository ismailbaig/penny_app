import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../sharedService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}
  LoginObj: any = {
    email: '',
    pd: '',
  };

  http = inject(HttpClient);

  onSubmit() {
    this.loginService.getLoginToken(this.LoginObj).subscribe(
      // success
      (res) => {
        if (res.access_token) {
          this.authService.setToken(
            res.access_token,
            res.username,
            res.user_id
          );
          this.authService.setEmail(res.email);
          this.router.navigate(['dashboard']);
        }
      },
      // err
      (err) => {
        this.errorMessage =
          'Incorrect email or password.Please register or try again';
      }
      // finally
    );
  }
}
