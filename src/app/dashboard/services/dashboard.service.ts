import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Task } from '../models/home.tasks.interface';
import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = '';

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  getAllTasks(): Observable<Task[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + "/apptask", { headers })
      .map(response => {
        return response.json()
      })
      .catch(this.handleError);
  }

  postTask(task: Task) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let body = task;

    return this.http
      .post(
        this.baseUrl + '/apptask', body, { headers }
      ).map(response => response.json())
      .catch(this.handleError);
  }

  deleteTask(taskId: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .delete(
        this.baseUrl + '/apptask/' + taskId, { headers }
      ).map(response => response)
      .catch(this.handleError);
  }

  putTask(task: Task, taskId: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let body = task;

    return this.http
      .put(
        this.baseUrl + '/apptask/' + taskId, body, { headers }
      ).map(response => response)
      .catch(this.handleError);
  }
}
