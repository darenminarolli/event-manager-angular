import { Component, OnInit, inject } from '@angular/core';

import { User } from '../../../core/models/user.interface';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [ButtonComponent],
})
export class UserProfilePage implements OnInit {
  authService = inject(AuthService);
  user = this.authService.user$;
  dataUser: User | null = null;

  ngOnInit(): void {
    this.authService.checkAuthStatus();  

    this.user.subscribe({
      next: (user) => (this.dataUser = user),
      error: (error) => console.error(error),
    });
  }
}