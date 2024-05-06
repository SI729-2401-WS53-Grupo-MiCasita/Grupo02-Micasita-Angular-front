import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../../../shared/services/base.service";
import {PaymentEntity} from "../../model/payment-entity/payment-entity.entity";
import {catchError, Observable, retry} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService<PaymentEntity>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/user_payments';
  }

  getAll(): Observable<PaymentEntity[]> {
    return this.http.get<PaymentEntity[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
