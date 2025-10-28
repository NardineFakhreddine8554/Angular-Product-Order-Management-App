import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';
import { finalize } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class RegistrationComponent{
  form: FormGroup;
  hidePassword = true;
  loading = false;
  serverMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(group: FormGroup) {
    const p = group.get('password')?.value;
    const cp = group.get('confirmPassword')?.value;
    return p === cp ? null : { passwordsMismatch: true };
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.serverMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    };
    this.loading = true;
    this.auth.register(payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.serverMessage = 'Registration successful!';
          this.form.reset();
        },
        error: err => {
          this.serverMessage = err?.message || 'Registration failed. Try again.';
        }
      });
  }
}
