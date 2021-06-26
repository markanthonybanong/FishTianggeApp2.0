import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArchieveDataService {

  public productForm = this.formBuilder.group({
    storeId: [null, Validators.required],
    img: null,
    imgForDisplay: null,
    remark: [null],
    name: [null,  Validators.required],
    price: [null, Validators.required],
    weight: [null, Validators.required],
    weightIn: [null, Validators.required],
    isAvailable: [null, Validators.required],
    id: null
});
public isAvailable:Array<String> = ['Yes', 'No'];
    
public weightIn:Array<String> = [
    'Gram',
    'Kilogram',
    'Pound'
];

  constructor(private formBuilder: FormBuilder) { }
}
