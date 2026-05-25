import { Component } from '@angular/core';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  login(org: string) {

    window.location.href =
      `http://localhost:8080/login?org=${org}`;
  }
}
