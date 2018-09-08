import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthCreditentials } from './auth-creditentials';

@Injectable()
export class AuthService {
  EXPIRE_IN_DAYS: number = 7;

  constructor(private cookieService: CookieService) { }

  public isAuthenticated(): boolean {
  	return (this.getToken() !== '');
  }

  public getToken() {
  	return this.cookieService.get('token');
  }

  public getLogin() {
  	return this.cookieService.get('login');
  }

  public setCreditentials(creditentials: AuthCreditentials) {
  	this.cookieService.set('login', creditentials.login, this.EXPIRE_IN_DAYS);
  	this.cookieService.set('token', creditentials.token, this.EXPIRE_IN_DAYS);
  }

  public getCreditentials(): AuthCreditentials {
  	let creditentials = new AuthCreditentials();
  	creditentials.login = this.getLogin();
  	creditentials.token = this.getToken();
  	return creditentials;
  }

}
