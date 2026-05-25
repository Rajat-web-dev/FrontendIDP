import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent implements OnInit {

  token: string | null = '';
  user: any = null;

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search);
    this.token = params.get('token');

    if (this.token) {

      localStorage.setItem('token', this.token);

      try {
        this.user = jwtDecode(this.token);
        console.log('Decoded User:', this.user);
      } catch (e) {
        console.error('Invalid token');
      }
    }
  }
}
