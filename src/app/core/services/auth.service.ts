import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.interface';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://event-manager-api-ten.vercel.app/api/auth';

  private userSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(() => new Error(error.error || error));
      })
    );
  }

  loginUser(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, data, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error logging in:', error);
          return throwError(() => new Error(error.error || error));
        })
      );
  }

  logoutUser(): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error logging out:', error);
          return throwError(() => new Error(error.error || error));
        })
      );
  }

  getUser(): User | null {
    const user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  setUser(user: User) {
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clearUser() {
    window.localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  checkAuthStatus() {
    if (!this.isAuthenticatedSubject.getValue()) {
      return;
    }
    return this.http
      .get<{ user: User }>(`${this.apiUrl}/me`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response.user) {
            this.setUser(response.user);
          } else {
            this.clearUser();
          }
        },
        error: (error) => {
          console.error('Failed to check auth status', error);
          this.clearUser();
        },
      });
  }
}
