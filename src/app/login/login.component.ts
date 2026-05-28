import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  error: string = '';
  isLoading: boolean = false;
  detectedProvider: string = '';
  private emailCheckTimeout: any;

  organizations = [
    {
      id: 'acme',
      name: 'ACME Corporation',
      type: 'Microsoft',
      icon: '🏢',
      color: '#4A90E2',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'xyz',
      name: 'XYZ Technologies',
      type: 'Google',
      icon: '🚀',
      color: '#E24A4A',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'techcorp',
      name: 'TechCorp Innovations',
      type: 'Google',
      icon: '💡',
      color: '#4AE27C',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'slackware',
      name: 'Slackware Enterprises',
      type: 'Slack',
      icon: '💬',
      color: '#4A154B',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'zohoorg',
      name: 'Zoho Solutions',
      type: 'Zoho',
      icon: '📊',
      color: '#E94E1F',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'gmail-users',
      name: 'Gmail Users',
      type: 'Google',
      icon: '📧',
      color: '#E2A64A',
      gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    },
    {
      id: 'outlook-users',
      name: 'Outlook Users',
      type: 'Microsoft',
      icon: '📨',
      color: '#4A90E2',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  testEmails = [
    { email: 'john@acme.com', provider: 'Microsoft', org: 'ACME', icon: '🏢' },
    { email: 'sarah@xyz.com', provider: 'Google', org: 'XYZ', icon: '🚀' },
    { email: 'mike@techcorp.com', provider: 'Google', org: 'TechCorp', icon: '💡' },
    { email: 'emily@slackware.com', provider: 'Slack', org: 'Slackware', icon: '💬' },
    { email: 'david@zoho.com', provider: 'Zoho', org: 'Zoho Solutions', icon: '📊' },
    { email: 'rajatshelby@gmail.com', provider: 'Google', org: 'Gmail Users', icon: '📧' },
    { email: 'bob@outlook.com', provider: 'Microsoft', org: 'Outlook Users', icon: '📨' }
  ];

  constructor(private http: HttpClient) {

    this.setupEmailDetection();
  }

  setupEmailDetection() {

  }

  onEmailChange() {
    if (this.emailCheckTimeout) {
      clearTimeout(this.emailCheckTimeout);
    }

    this.emailCheckTimeout = setTimeout(() => {
      this.detectProviderFromEmail();
    }, 500);
  }

  detectProviderFromEmail() {
    const testMatch = this.testEmails.find(t => t.email === this.email);
    if (testMatch) {
      this.detectedProvider = `${testMatch.provider} (${testMatch.org})`;
    } else if (this.email.includes('@')) {
      const domain = this.email.split('@')[1];
      const providerMap: any = {
        'acme.com': 'Microsoft (ACME)',
        'xyz.com': 'Google (XYZ)',
        'techcorp.com': 'Google (TechCorp)',
        'slackware.com': 'Slack (Slackware)',
        'zoho.com': 'Zoho (Zoho Solutions)',
        'gmail.com': 'Google (Gmail Users)',
        'outlook.com': 'Microsoft (Outlook Users)'
      };
      this.detectedProvider = providerMap[domain] || 'Unknown provider';
    } else {
      this.detectedProvider = '';
    }
  }

  login(org: string) {
    window.location.href = `http://localhost:8080/login?org=${org}`;
  }

  loginWithEmail() {
    if (!this.email) {
      this.error = 'Please enter an email address';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.http.post('http://localhost:8080/auth/email', { email: this.email })
      .subscribe({
        next: (response: any) => {
          window.location.href = response.auth_url;
        },
        error: (err) => {
          this.error = err.error?.error || 'Authentication failed. Please check if this email domain is supported.';
          this.isLoading = false;
          console.error('Error:', err);

          setTimeout(() => {
            if (this.error) this.error = '';
          }, 5000);
        }
      });
  }

  ngOnDestroy() {
    if (this.emailCheckTimeout) {
      clearTimeout(this.emailCheckTimeout);
    }
  }
}
