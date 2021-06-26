import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RatingDataService {
  public form = this.formBuilder.group({
    userId: [null, Validators.required],
    storeId: [null, Validators.required],
    rating: [null, Validators.required],
    feedback: null,
    dateRate: [null, Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder
  ) { }
}
