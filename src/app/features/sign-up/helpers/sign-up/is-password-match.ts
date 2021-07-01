export function isPasswordMatch(password: string, confirmPassword: string): boolean{
    return password === confirmPassword ? true : false;
}