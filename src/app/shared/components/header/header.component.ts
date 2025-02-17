import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit,OnDestroy {
  isLoggedIn: boolean = false
  private destroy$ = new Subject<void>()
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.checkAuthStatus(); 
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (isAuth) => this.isLoggedIn = isAuth,
      error: () => this.isLoggedIn = false,
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
