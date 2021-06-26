import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class StoreProductDataService {
    public weightInLabel: string = null;
    public storeProductForm = this.formBuilder.group({
        img: null,
        imgForDisplay: null,
        remark: null,
        name: [null,  Validators.required], 
        weight: [null, Validators.required],
        weightIn: [null, Validators.required],
        price: [null, Validators.required],
        quantity: [null, Validators.required],
        userId: [null, Validators.required],
        storeId: [null,  Validators.required]
    });
    public weightIn:Array<String> = [
        'Gram',
        'Kilogram',
        'Pound'
    ];
   
    constructor(private formBuilder: FormBuilder) {}
    setWeightIn(weight, weightIn): void {
        if(weight > 1) {
            this.weightInLabel = `${weightIn}s`;
        } else {
            this.weightInLabel = weightIn;
        }
    }
}