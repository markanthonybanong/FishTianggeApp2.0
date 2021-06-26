import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutDataService {
  public totals: number = 0;
  public cODForm =  this.formBuilder.group({
    customerName: [null, Validators.required],
    dateOrder: [null, Validators.required],
    mobilePhone: [null, Validators.required],
    address: [null, Validators.required],
    orderNote: null
  });
  constructor(
    private formBuilder: FormBuilder
  ) { }
}
