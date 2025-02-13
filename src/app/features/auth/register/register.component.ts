import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
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
  return password === confirmPassword ? null : { passwordNoMatch: true };
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

  registerForm: FormGroup = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: confirmPasswordValidator }
  );

  getErrorMessage(controlName: string) {
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
      this.registerForm.hasError('passwordNoMatch') &&
      controlName === 'confirmPassword' &&
      control?.touched
    ) {
      return 'Passwords do not match';
    }
    return ;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { confirmPassword, ...data } = this.registerForm.value;

    this.authService
      .registerUser(data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.isLoading = false;
          this.registerError =
            'Error registering user, please try again later!';
        },
      });
      this.registerForm.reset()
  }
}
