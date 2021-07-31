import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutDataService {
  public form =  this.formBuilder.group({
    customerName: [null, Validators.required],
    dateOrder: [null, Validators.required],
    mobilePhone: [null, Validators.required],
    address: [null, Validators.required],
    addressLat: [null, Validators.required],
    addressLng: [null, Validators.required],
    orderNote: null
  });
  constructor(
    private formBuilder: FormBuilder
  ) { }
}
