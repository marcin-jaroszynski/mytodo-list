import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { LoginCreditentials } from '../login-creditentials';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loginInput: string = '';
  @Input() passwordInput: string = '';

  constructor(private loginSerivce: LoginService,
              private cookieService: CookieService,
              private router: Router) { }

  login(): void {
    const loginCreditentials = new LoginCreditentials();
    loginCreditentials.login  = this.loginInput.trim();
    loginCreditentials.password  = this.passwordInput.trim();

    if (!loginCreditentials.validate()) {
      alert('Fill all fields!');
      return;
    }
    this.loginSerivce.login(loginCreditentials).subscribe( response => {
      if (true === response['success']) {
        if (response['token']) {
          this.cookieService.set('token', response['token'], 7);
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }

  ngOnInit() {
  }

}
