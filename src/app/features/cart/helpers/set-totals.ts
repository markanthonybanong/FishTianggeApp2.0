import { Cart } from 'src/app/shared/types/cart';

export const setTotals = (cartItems: Cart[]): number => {
    let totals = 0;
    let i      = 0;
    while(i < cartItems.length){
        totals += cartItems[i].price * cartItems[i].quantity;
        i++;
    }
    return totals;
};
