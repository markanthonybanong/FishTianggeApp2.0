import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ProductDataService {
    public productForm = this.formBuilder.group({
        storeId: null,
        img: null,
        imgForDisplay: null,
        remark: null,
        name: [null, Validators.required],
        price: [null, Validators.required],
        weight: [null, Validators.required],
        weightIn: [null, Validators.required],
        isAvailable: [null, Validators.required],
        category: null,
        quantity: null,
        userId: null,
        classificationSeller: [null,  Validators.required],
        classificationBuyer: null,
        id: null
    });

    public isAvailable: Array<string> = ['Yes', 'No'];

    public weightIn: Array<string> = [
        'Gram',
        'Kilogram',
        'Pound'
    ];
    public classificationBuyer: Array<string> = [
        'Debone',
        'Scale',
        'Slice'
    ];
    public classificationSeller: Array<string> = [
        'Yes',
        'No'
    ];
    constructor(private formBuilder: FormBuilder){}
}
