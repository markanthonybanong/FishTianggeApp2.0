export function findPhoneNumber(users: Array<any>, phoneNumber: string): boolean {
    let isFound = false;
    for (let i = 0; i < users.length; i++) {
        if(phoneNumber == users[i].phone_number) {
            isFound = true;
            break;
        }
        
    }
    return isFound;
}