import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { LoginCreditentials } from '../login-creditentials';
import { AuthCreditentials } from '../auth-creditentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loginInput: string = '';
  @Input() passwordInput: string = '';

  constructor(private loginService: LoginService,
              private cookieService: CookieService,
              private authService: AuthService,
              private router: Router) { }

  login(): void {
    const loginCreditentials = new LoginCreditentials();
    loginCreditentials.login  = this.loginInput.trim();
    loginCreditentials.password  = this.passwordInput.trim();

    if (!loginCreditentials.validate()) {
      alert('Fill all fields!');
      return;
    }
    this.loginService.login(loginCreditentials).subscribe( response => {
      if (true === response['success']) {
        if (response['token']) {
          const authCreditentials = new AuthCreditentials();
          authCreditentials.login = loginCreditentials.login;
          authCreditentials.token = response['token'];
          this.authService.setCreditentials(authCreditentials);
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }
  _checkIsUserLogged() {
    if (this.authService.isAuthenticated()) {
      this.loginService.autologin(this.authService.getCreditentials()).subscribe( response => {
        if (true === response['success']) {
          this.router.navigateByUrl('/dashboard');
        }
      });
    }
  }

  ngOnInit() {
    this._checkIsUserLogged();
  }

}
