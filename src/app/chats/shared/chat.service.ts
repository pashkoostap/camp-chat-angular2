import { Injectable } from '@angular/core';
import { CHATS } from './mock-chats';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ChatService {
    private search$: BehaviorSubject<string> = new BehaviorSubject('');
    getAll() {
        return Promise.resolve(CHATS);
    }

    public setSearchValue(value: string):void {
        this.search$.next(value);
    }

    public getSearchValue():BehaviorSubject<string> {
        return this.search$;
    }
}