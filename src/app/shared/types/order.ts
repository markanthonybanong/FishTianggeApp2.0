export interface Order{
    id?: string;
    store_id?: string;
    user_id?: string;
    product_img?: string;
    name?: string;
    price: number;
    quantity: number;
    subtotal?: number;
    customer_name?: string;
    status: string;
    order_date?: string;
    order_note?: string;
    customer_mobile_num?: number;
    customer_address?: string;
}