import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { SignupDTO } from '../models/signup.dto';
import { SignupResponse } from '../models/signup-response.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  errorMessage = '';
  constructor(
    private signupService: SignupService,
    private router: Router,
  ) {}
  SignUpObj: SignupDTO = {
    name: '',
    email: '',
    phoneno: '',
    password: '',
  };

  http = inject(HttpClient);

  onSubmit(signUpForm: any) {
    this.signupService.addUser(this.SignUpObj).subscribe(
      (res:SignupResponse)=>{
        if(res.success){
        this.router.navigate(['login']);
        }
      },
      (err)=>{
        this.errorMessage = "Duplicate User: Email or Username already exist"
      }

    )
  }
}
