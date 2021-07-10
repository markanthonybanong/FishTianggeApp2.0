import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderStatus } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  public deliverForm = this.formBuilder.group({
    orderId: [null,  Validators.required],
    storeId: [null, Validators.required],
    courierId: [null, Validators.required],
    courierNameHolder: null,
    courierName: [null, Validators.required],
    courierPhoneNum: [null, Validators.required],
    productImg: null,
    name: [null, Validators.required],
    price: [null, Validators.required],
    quantity: [null, Validators.required],
    subtotal: [null, Validators.required],
    deliveryStatusHolder: null,
    deliveryStatus: [null, Validators.required],
    customerName: [null, Validators.required],
    customerMobileNum: [null, Validators.required],
    shippingAddress: [null, Validators.required],
    orderDate: [null, Validators.required],
    orderNote: null,
    id: null
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }
  get orderStatuses(): Array<string> {
    return [
      OrderStatus.DECLINE,
      OrderStatus.ACCEPT,
      OrderStatus.ONTHEWAY,
      OrderStatus.DELIVER
    ];
  }
   buttonName(orderStatus: string): string {
      return orderStatus === OrderStatus.NONE ? 'Deliver' : 'Update';
   }
}
