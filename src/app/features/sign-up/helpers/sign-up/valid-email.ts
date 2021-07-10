/* eslint-disable max-len */
export const validEmail = (email: string): boolean =>{
    const re = /^[^\s@]+@[^\s@]+$/;
    return re.test(email);
};
