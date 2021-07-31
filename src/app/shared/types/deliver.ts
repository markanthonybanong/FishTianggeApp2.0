/* eslint-disable @typescript-eslint/naming-convention */
export interface Deliver {
    id: string;
    order_id: number;
    store_id: string;
    courier_id: string;
    courier_name: string;
    courier_phone_num: number;
    product_img: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    status: string;
    customer_name: string;
    customer_mobile_num: number;
    customer_address: string;
    customer_address_lat: number;
    customer_address_lng: number;
    order_date: Date;
    cour_lat: number;
    cour_lng: number;
    watch_id: number;
    interval_id: number;
}
