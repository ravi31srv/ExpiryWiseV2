import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="brand-logo-container">
            <div class="logo-wrapper">
              <span>📦</span>
            </div>
            <span class="brand-name">ExpiryWise</span>
          </div>
          <h2>Reset Password</h2>
          <p>Enter your email to receive a reset token</p>
        </div>
        
        <div *ngIf="errorMessage" class="error-message" style="margin-bottom: 1.5rem; text-align: center;">
          {{ errorMessage }}
        </div>

        <div *ngIf="successMessage" class="toast toast-success">
          {{ successMessage }}
        </div>

        <form *ngIf="!successMessage" (submit)="onSubmit()">
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

          <button type="submit" class="btn btn-primary" [disabled]="loading" style="margin-top: 1rem;">
            {{ loading ? 'Sending...' : 'Send Reset Token' }}
          </button>
        </form>

        <div class="auth-footer">
          Remember your password? <a routerLink="/login">Sign in</a>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class ForgotPasswordComponent {
  email = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.email) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'A reset token has been generated. In this demo, you can find it in the API response.';
        console.log('Reset Token:', res.resetToken);
        // In a real app, we might redirect to reset-password with the token or tell them to check email
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to process request.';
      },
    });
  }
}