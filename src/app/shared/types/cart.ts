export interface Cart{
    img: string;
    imgForDisplay: string;
    name: string;
    price: number;
    weight: string;
    quantity: number;
    remark: string;
    store_id: string;
    user_id: string;
    subTotal?: number;
    id: string;
}