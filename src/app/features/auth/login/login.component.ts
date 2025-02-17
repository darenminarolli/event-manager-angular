import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPage {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService)
  router  =  inject(Router)
 
  isLoading = false;
  loginError = '';
  
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
    }

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.loginUser({ email, password }).pipe(take(1)).subscribe({
        next: (res) => {
          this.authService.setUser(res.user);  
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          this.loginError = 'Error login  user, please try again later!';
        }
      });
    }
    this.loginForm.reset()
  }
}