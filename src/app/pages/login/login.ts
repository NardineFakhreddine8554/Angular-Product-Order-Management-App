import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;
  loading = false;
  serverMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.serverMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    this.loading = true;
    this.auth.login(payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.serverMessage = 'Login successful!';
          this.form.reset();
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.serverMessage = err?.message || 'Invalid credentials';
        }
      });
  }
}
