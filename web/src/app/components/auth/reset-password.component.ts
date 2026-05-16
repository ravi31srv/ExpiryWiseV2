import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  template: `
    <div class="auth-page">
      <div class="glass-card">
        <h2>New Password</h2>
        <p class="subtitle">Create a secure new password</p>
        
        <div *ngIf="errorMessage" class="error-msg">
          {{ errorMessage }}
        </div>

        <form (submit)="onSubmit()">
          <div class="form-group">
            <label for="token">Reset Token</label>
            <input 
              type="text" 
              id="token" 
              [(ngModel)]="token" 
              name="token" 
              placeholder="Paste your reset token here"
              required 
            />
          </div>

          <div class="form-group">
            <label for="password">New Password</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>

        <div class="auth-links">
          Back to <a routerLink="/login">Sign in</a>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class ResetPasswordComponent {
  token = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Optionally get token from query params if available
    this.token = this.route.snapshot.queryParams['token'] || '';
  }

  onSubmit(): void {
    if (!this.token || !this.password) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.resetPassword(this.token, this.password).subscribe({
      next: () => {
        alert('Password reset successful! Please login with your new password.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to reset password. Token may be invalid or expired.';
      },
    });
  }
}