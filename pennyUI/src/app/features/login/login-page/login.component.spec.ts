import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../services/login.service';
import { AuthService } from 'pennyUI/src/app/core/authentication/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceMock: any;
  let authServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    loginServiceMock = {
      getLoginToken: jest.fn()
    };
    authServiceMock = {
      setToken: jest.fn(),
      setEmail: jest.fn(),
      getErrorMessage: jest.fn().mockReturnValue('Test error message')
    };

    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),  
        LoginComponent  
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
