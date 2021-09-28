import { FormGroup } from '@angular/forms';

export const clearDeliverFormValue = (deliverForm: FormGroup): void => {
    deliverForm.patchValue({
    orderId: null,
    storeId: null,
    courierId: null,
    courierNameHolder: null,
    courierName: null,
    courierPhoneNum: null,
    productImg: null,
    name: null,
    price: null,
    quantity: null,
    subtotal: null,
    deliveryStatusHolder: null,
    deliveryStatus: null,
    customerName: null,
    customerMobileNum: null,
    shippingAddress: null,
    orderDate: null,
    orderNote: null,
    id: null,
    classification: null,
    });
};
