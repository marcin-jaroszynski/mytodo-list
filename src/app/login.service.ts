import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LoginCreditentials } from './login-creditentials';
import { MessageService } from './message.service';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private messsageService: MessageService) { }

  login(data: LoginCreditentials) {
    const params = { login: data.login, password: data.password };
    return this.http.post('/api/login', params, httpOptions).pipe(catchError(this.handleError()));
  }

  private handleError () {
    return (error: any) => {
      this.messsageService.speak(error.error.message);
      return of(error.error);
    };
  }
}
