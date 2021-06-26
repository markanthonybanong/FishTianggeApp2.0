import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileDataService {
  public form = this.formbuilder.group({
    img: null,
    imgForDisplay: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    address: [null, Validators.required],
    id: null
  });
  constructor(
    private formbuilder: FormBuilder
  ) { }
}
