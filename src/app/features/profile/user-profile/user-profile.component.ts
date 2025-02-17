import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
})
export class UserProfilePage implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  user = this.authService.user$;
  dataUser: User | null = null;

  ngOnInit(): void {
    this.authService.checkAuthStatus();

    this.user.subscribe({
      next: (user) => (this.dataUser = user),
      error: () => alert('we could not geet the user data at the moment!'),
    });
  }

  logout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        this.authService.clearUser();
        this.router.navigate(['/']);
      },
      error: () => alert('We could not log you out at the moment!'),
    });
  }
}
