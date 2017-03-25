import { Injectable } from '@angular/core';
import { CHATS } from './mock-chats';
import { Chat } from './chat.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
    private search$: BehaviorSubject<string> = new BehaviorSubject('');
    getAll(): Observable<Chat[]> {
        return Observable.create(observer => observer.next(CHATS))
    }

    public setSearchValue(value: string):void {
        this.search$.next(value);
    }

    public getSearchValue():BehaviorSubject<string> {
        return this.search$;
    }
}