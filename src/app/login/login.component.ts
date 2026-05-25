import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  login(org: string) {
    window.location.href = `http://localhost:8080/login?org=${org}`;
  }

  loginWithEmail() {
    if (!this.email) {
      this.error = 'Please enter an email';
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    this.http.post('http://localhost:8080/auth/email', { email: this.email })
      .subscribe({
        next: (response: any) => {
          window.location.href = response.auth_url;
        },
        error: (err) => {
          this.error = err.error?.error || 'Authentication failed';
          console.error('Error:', err);
        }
      });
  }
}
