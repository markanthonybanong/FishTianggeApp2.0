export const validPhoneNumber = (phoneNumber: any): boolean =>{
    const isValid = /^(09)\d{9}$/.test(phoneNumber);
    return isValid;
};
