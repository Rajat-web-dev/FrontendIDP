import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent implements OnInit {

  token: string | null = null;
  user: any = null;
  orgName: string | null = null;

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search);
    this.token = params.get('token');
    this.orgName = params.get('org');

    if (this.token) {

      localStorage.setItem('token', this.token);

      try {
        this.user = jwtDecode(this.token);
      } catch (e) {
        console.error('Invalid token');
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  isLoggedIn() {
    return !!this.user;
  }
}
