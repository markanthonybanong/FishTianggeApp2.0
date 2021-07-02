import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/types';

export const setProductForm = (product: Product, form: FormGroup): void =>{
    form.patchValue({
        img: product.img,
        remark: product.remark,
        name: product.name,
        weight: product.weight,
        weightIn: product.weight_in,
        price: product.price,
        storeId: product.store_id
    });
}