import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'pennyUI/src/app/core/authentication/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      getErrorMessage: jest.fn(),
    };
    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      imports: [LoginComponent, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage based on authService', () => {
    const expectedErrorMessage = 'Test error message';
    authServiceMock.getErrorMessage.mockReturnValue(expectedErrorMessage);
    component.ngOnInit();
    expect(component.errorMessage).toBe(expectedErrorMessage);
    expect(authServiceMock.getErrorMessage).toHaveBeenCalled();
  });
});
