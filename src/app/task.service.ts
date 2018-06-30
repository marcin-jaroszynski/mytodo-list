import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Task } from './task';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  getList() {
  	return this.http.get('/api/tasks');
  }
}
