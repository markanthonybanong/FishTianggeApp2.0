/* eslint-disable @typescript-eslint/naming-convention */
export interface Order{
    id?: string;
    store_id?: string;
    user_id?: string;
    product_img?: string;
    name?: string;
    price: number;
    quantity: number;
    customer_name?: string;
    status: string;
    seller_status: string;
    order_date?: Date;
    order_note?: string;
    customer_mobile_num?: number;
    customer_address?: string;
};
