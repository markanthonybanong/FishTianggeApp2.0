import { User } from "src/app/shared/types";

export function findEmail(users: Array<User>, inputEmail: string): boolean {
    let isFound = false;
    for (let i = 0; i < users.length; i++) {
        if(inputEmail === users[i].email) {
            isFound = true;
            break;
        }        
    }
    return isFound;
}