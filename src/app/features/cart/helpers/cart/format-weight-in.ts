export const formatWeightIn = (weightIn: string): string =>{
    let symbol = '';
    if(weightIn === 'Gram'){
        symbol = 'g';
    } else if(weightIn === 'Kilogram'){
        symbol = 'kg';
    } else {
        symbol = '£';
    }
    return symbol;
};
