import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderProductDataService {
  public courierName: string = null;
  public deliverForm = this.formBuilder.group({
    orderId: [null,  Validators.required],
    storeId: [null, Validators.required],
    courierId: [null, Validators.required],
    courierNameHolder: null,
    courierName: [null, Validators.required],
    courierPhoneNum: [null, Validators.required],
    productImg: null,
    imgForDisplay: null,
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
    id: null,
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }
}
