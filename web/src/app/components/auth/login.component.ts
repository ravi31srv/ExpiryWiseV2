import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Welcome Back</h2>
          <p>Log in to manage your expiry dates</p>
        </div>
        
        <div *ngIf="errorMessage" class="error-message" style="margin-bottom: 1.5rem; text-align: center;">
          {{ errorMessage }}
        </div>

        <form (submit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                [(ngModel)]="email" 
                name="email" 
                placeholder="name@example.com"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label for="password" style="margin-bottom: 0;">Password</label>
              <a routerLink="/forgot-password" class="btn-link" style="font-size: 0.75rem;">Forgot password?</a>
            </div>
            <div class="input-wrapper">
              <input 
                type="password" 
                id="password" 
                [(ngModel)]="password" 
                name="password" 
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loading" style="margin-top: 1rem;">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-footer">
          Don't have an account? <a routerLink="/signup">Sign up</a>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        console.error('Login failed', err);
      },
    });
  }
}