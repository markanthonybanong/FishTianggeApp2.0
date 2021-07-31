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
    deliveryStatusHolder: null, //use in deliver-store to check if courier have delivery status
    deliveryStatus: [null, Validators.required],
    customerName: [null, Validators.required],
    customerMobileNum: [null, Validators.required],
    shippingAddress: [null, Validators.required],
    shippingAddressLat: [null, Validators.required],
    shippingAddressLng: [null, Validators.required],
    orderDate: [null, Validators.required],
    orderNote: null,
    id: null
  });
  public ratingForm = this.formBuilder.group({
    id: null,
    storeId: [null, Validators.required],
    orderId: [null, Validators.required],
    starNumber: [null, Validators.required],
    userComment: [null, Validators.required],
    dateRate: [null, Validators.required],
    userId: [null, Validators.required]
  });
  public reportForm = this.formBuilder.group({
    storeId: [null, Validators.required],
    orderId: [null, Validators.required],
    deliverId: [null, Validators.required],
    userComment: [null, Validators.required],
    dateReported: [null, Validators.required],
    userId: [null, Validators.required]
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

  get orderStatusesBuyer(): string[]{
    return [
      OrderStatus.ORDERDERRECEIVED
    ];
  };
   buttonName(orderStatus: string): string {
      return orderStatus === OrderStatus.NONE ? 'Deliver' : 'Update';
   }
}
