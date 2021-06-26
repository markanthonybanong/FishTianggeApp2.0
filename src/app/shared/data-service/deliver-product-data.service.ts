import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderStatus } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class DeliverProductDataService {

  constructor() { }

  get orderStatuses(): Array<string> {
    return [
      OrderStatus.DECLINE,
      OrderStatus.ACCEPT,
      OrderStatus.ONTHEWAY,
      OrderStatus.DELIVER
    ];
  }
}
