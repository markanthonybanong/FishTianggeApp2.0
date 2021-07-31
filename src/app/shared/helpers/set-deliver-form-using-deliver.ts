import { FormGroup } from '@angular/forms';
import { formatDate } from '@fish-tiangge/shared/helpers';
import { Deliver } from '../types/deliver';

export const setDeliverFormUsingDeliver = (deliver: Deliver, form: FormGroup): void=> {
    form.patchValue({
        orderId: deliver.id,
        storeId: deliver.store_id,
        courierId: deliver.courier_id,
        courierName: deliver.courier_name,
        courierPhoneNum: deliver.courier_phone_num,
        productImg: deliver.product_img,
        name: deliver.name,
        price: deliver.price,
        quantity: deliver.quantity,
        subtotal: deliver.subtotal,
        deliveryStatusHolder: null,
        deliveryStatus: deliver.status,
        customerName: deliver.customer_name,
        customerMobileNum: deliver.customer_mobile_num,
        shippingAddress: deliver.customer_address,
        shippingAddressLat: deliver.customer_address_lat,
        shippingAddressLng: deliver.customer_address_lng,
        orderDate: formatDate(deliver.order_date),
        id: deliver.id
    });
};
