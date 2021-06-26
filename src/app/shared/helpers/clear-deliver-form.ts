import { FormGroup } from '@angular/forms';

export function clearDeliverFormValue(deliverForm: FormGroup): void {
    deliverForm.patchValue({
        storeId: null,
        courierId: null,
        courierName: null,
        courierPhoneNum: null,
        productImg: null,
        imgForDisplay: null,
        name: null,
        price: null,
        quantity: null,
        subtotal: null,
        deliveryStatus: null,
        customerName: null,
        customerMobileNum: null,
        shippingAddress: null,
        orderDate: null
    });
}