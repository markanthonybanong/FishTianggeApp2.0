/* eslint-disable @typescript-eslint/naming-convention */
export interface Cart{
    img: string;
    imgForDisplay: string;
    name: string;
    price: number;
    weight: string;
    quantity: number;
    remark: string;
    category: string;
    product_id: string;
    store_id: string;
    user_id: string;
    subTotal?: number;
    id: string;
}
