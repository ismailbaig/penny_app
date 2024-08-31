import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'pennyUI/src/app/core/authentication/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
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

  ngOnInit(){
    this.errorMessage=this.authService.getErrorMessage();
  }

  onSubmit() {
    this.loginService.getLoginToken(this.LoginObj).subscribe(
      // success
      (res) => {
        if (res.access_token) {
          this.authService.setToken(
            res.access_token,
            res.username,
            res.user_id,
            res.expires_in
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
