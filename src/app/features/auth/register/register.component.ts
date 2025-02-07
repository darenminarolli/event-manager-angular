import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { PasswordNoMatch: true };
};

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterPage {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = false;
  registerError = '';

  registerForm = this.formBuilder.group(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: [confirmPasswordValidator],
    }
  );

  getErrorMessage(controlName: string): any {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('required') && control.touched) {
      return `${controlName} is required`;
    }
    if (control?.hasError('email') && control.touched) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength') && control.touched) {
      return `${controlName} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (
      this.registerForm.hasError('PasswordNoMatch') &&
      controlName === 'confirmPassword' &&
      (control?.touched || this.registerForm.get('password')?.touched)
    ) {
      return 'Passwords do not match';
    }
    return;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if(this.registerForm.valid){
      this.isLoading = true;
    }
    const data = { ...this.registerForm.value };
    delete data['confirmPassword'];
    this.authService
      .registerUser(data)
      .pipe(take(1))
      .subscribe({
        next: () => {this.router.navigate(['/auth/login'])
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.registerError = 'Error registering user, please try again later!';
        },
      });
  }
}
