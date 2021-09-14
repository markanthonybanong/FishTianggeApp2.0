import { FormGroup } from '@angular/forms';

export const clearProductForm = (form: FormGroup): void => {
    form.patchValue({
        img: null,
        imgForDisplay: null,
        remark: null,
        name: null,
        weight: null,
        weightIn: null,
        price: null,
        isAvailable: null,
        category: null
    });
};
