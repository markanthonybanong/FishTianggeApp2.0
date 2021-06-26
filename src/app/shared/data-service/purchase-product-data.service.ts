import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PurchaseProductDataService {
  public orderForm = this.formBuilder.group({
    productImg: null,
    name: [null, Validators.required],
    price: [null, Validators.required],
    quantity: [null, Validators.required],
    subtotal: [null, Validators.required],
    deliveryStatus: [null, Validators.required],
    customerName: [null, Validators.required],
    customerMobileNum: [null, Validators.required],
    shippingAddress: [null, Validators.required],
    orderDate: [null, Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder
  ) { }
  get orderStatuses(): Array<string>{
    return ['Cancel'];
  }
}
