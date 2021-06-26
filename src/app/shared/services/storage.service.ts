import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LoginUser } from '../types';
const { Storage } = Plugins;
@Injectable({
    providedIn: 'root'
 })
export class StorageService {
    async setLoginUser(user: LoginUser): Promise<void> {
        await Storage.set({
            key: 'loginUser',
            value: JSON.stringify({
                id: user.id,
                userType: user.userType,
                userName: user.userName,
                storeId: user.storeId
            })
        });
    }

    async getloginUser(): Promise<LoginUser> {
        const storage = await Storage.get({key: 'loginUser'});
        return JSON.parse(storage.value);
    }

    async clear(): Promise<void> {
        await Storage.clear();
    }

    async setLoginUserStoreId(user: LoginUser, storeId: string): Promise<void> {
        await Storage.set({
            key: 'loginUser',
            value: JSON.stringify({
                id: user.id,
                userType: user.userType,
                userName: user.userName,
                storeId: storeId,
                
            })
        });
    }

}