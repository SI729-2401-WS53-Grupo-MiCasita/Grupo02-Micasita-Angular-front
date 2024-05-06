import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../../../shared/services/base.service";
import { User } from "../../model/user-entity/user.entity";
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<User> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/users';
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
