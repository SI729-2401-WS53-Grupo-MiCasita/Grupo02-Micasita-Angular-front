import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';
import { Estate} from "../../model/estate-entity/estate.entity";
import {BaseService} from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class EstatesService extends BaseService<Estate>{
  private baseUrl = 'https://my-json-server.typicode.com/drkdevv1/db-server-demo'


  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/estates';
  }
  getEstates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/estates`);
  }

  getEstateById(id: string): Observable<Estate> {
    return this.http.get<Estate>(`${this.baseUrl}/estates/${id}`);
  }
  getAll(): Observable<Estate[]> {
    return this.http.get<Estate[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
