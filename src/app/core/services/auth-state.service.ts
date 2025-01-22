import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';

const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
 
  constructor(private http: HttpClient){}
  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  getUser(){
    const user =  window.localStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user)
    }
    return null
  }
  public setUser(user: User) {
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
  
  checkAuthStatus(){
    return this.http.get<{user:User}>('https://event-manager-api-ten.vercel.app/api/auth/me',  { withCredentials: true }).subscribe({
      next: (response) => {
        if(response.user){
          this.setUser(response.user);
        }else{
          this.clearUser();
        }
      },
      error: (error) => {
        console.error('Failed to check auth status', error);
        this.clearUser();
      }
    })
  }
}