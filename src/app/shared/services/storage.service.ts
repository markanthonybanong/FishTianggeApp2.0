import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
 })
export class StorageService {
    constructor(
    ){
    }
    public async set(key: string, value: any): Promise<void> {
        await  Storage.set({
            key,
            value: JSON.stringify(value)
          });
    }
    public async get(key): Promise<any>{
        const item = await Storage.get({ key });
        return JSON.parse(item.value);
    }
    public async clear(): Promise<void>{
        await Storage.clear();
    }
}
