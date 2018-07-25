import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCreditentials } from './login-creditentials';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: LoginCreditentials) {
    const params = { login: data.login, password: data.password };
    return this.http.get('/api/login', { params: params });
  }

}
