import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(() => {
    routerSpy = { navigate: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Email functionality', () => {
    it('should set and retrieve email', () => {
      service.setEmail('test@example.com');
      expect(service.getEmail()).toBe('test@example.com');
    });
  });

  describe('clearData and logout', () => {
    it('should clear user data on logout', () => {
      service.setToken('abc123', 'user1', 'id1', 3600);
      service.logout();
      expect(service.getToken()).toBeNull();
      expect(service.getUsername()).toBeNull();
      expect(service.getUserId()).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should set an error message on logout', () => {
      service.logout('Logged out successfully.');
      expect(service.getErrorMessage()).toBe('Logged out successfully.');
    });
  });
});
