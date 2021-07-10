import { FormGroup } from '@angular/forms';
import { OrderStatus } from '@fish-tiangge/shared/enums';
import { formatDate } from '@fish-tiangge/shared/helpers';
import { Order } from '@fish-tiannge/shared/types';

export const setDeliverFormUsingOrder = (order: Order, deliverForm: FormGroup): void => {
    deliverForm.patchValue({
        orderId: order.id,
        storeId: order.store_id,
        productImg: order.product_img,
        name: order.name,
        price: order.price,
        quantity: order.quantity,
        subtotal: order.price * order.quantity,
        deliveryStatus: OrderStatus.PENDING, //when newly ordered by buyer it is pending
        customerName: order.customer_name,
        customerMobileNum: order.customer_mobile_num,
        shippingAddress: order.customer_address,
        orderDate: formatDate(order.order_date),
        orderNote: order.order_note
    });
};
