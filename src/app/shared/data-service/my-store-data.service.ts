import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class MyStoreDataService {
    public storeForm = this.formbuilder.group({
        userId: null,
        img: null,
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
