import { FormGroup } from '@angular/forms';

export const clearMyStoreForm = (storeForm: FormGroup): void  =>{
    storeForm.patchValue({
        userId: null,
        img: null,
        imgForDisplay: null,
        name: null,
        information: null,
        location: null,
        id: null,
    });
}