import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class MyStoreDataService {
    public isAdd: boolean = true; 
    public storeform = this.formbuilder.group({
        userId: [null,  Validators.required],
        img: null,
        imgForDisplay: null,
        name: [null, Validators.required],
        information: null,
        location: null,
        contactNumber: null,
        id: null
    });
    
    constructor(
        private formbuilder: FormBuilder
    ) {

    }
}