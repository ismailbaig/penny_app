import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'pennyUI/src/app/core/authentication/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: any;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      logout: jest.fn(),
      getToken: jest.fn(() => 'some-token'),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    mockStore = {
      select: jest.fn().mockImplementation((selector) => {
        switch (selector) {
          case 'selectOrders':
            return of([]);
          case 'selectNoRecordsFound':
            return of(false);
          case 'selectOrderError':
            return of(null);
          default:
            return of(null);
        }
      }),
      dispatch: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout, clear orders, and navigate to login', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should redirect to login if no token found', () => {
    mockAuthService.getToken.mockReturnValue(null);
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
