import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import { Task } from './task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class TaskService {
  params = { token: '' };
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.params.token = '';
    if (this.cookieService.check('token')) {
      this.params.token = this.cookieService.get('token');
    }
  }

  getList() {
    return this.http.get('/api/tasks', { params: this.params });
  }

  addTask(title: string) {
    this.params['title'] = title;
    return this.http.post('/api/task/add', this.params, httpOptions);
  }

  markAsFinished(id: string) {
    this.params['id'] = id;
    return this.http.post('/api/task/finished', this.params, httpOptions);
  }

  editTask(task: Task) {
    this.params['id'] = task.id;
    this.params['title'] = task.title;
    return this.http.post('/api/task/edit', this.params, httpOptions);
  }

  removeTask(id: string) {
    this.params['id'] = id;
    return this.http.post('/api/task/remove', this.params, httpOptions);
  }
}
