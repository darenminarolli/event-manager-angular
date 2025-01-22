import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { take } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ButtonComponent,InputComponent, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPage {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService)
  router  =  inject(Router)
 
  isLoading = false;
  loginError = '';
  
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })


  getEmailError(): string {
    const control = this.loginForm.get('email');
    if (control?.touched) {
      if (control.hasError('required')) {
        return 'Email is required';
      }
      if (control.hasError('email')) {
        return 'Invalid email format';
      }
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.loginForm.get('password');
    if (control?.touched) {
      if (control.hasError('required')) {
        return 'Password is required';
      }
      if (control.hasError('minlength')) {
        return 'Password must be at least 6 characters';
      }
    }
    return '';
  }
 
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
          this.loginError = err.message;
          console.error(err);
        }
      });
    }
  }
}