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

    getChatParamsByChatId(id: number): Observable<Chat> {
        const chat = CHATS.filter(chat => chat.id === id);
        return Observable.create(observer => observer.next(CHATS.filter(chat => chat.id === id)[0]));
    }

    public setSearchValue(value: string):void {
        this.search$.next(value);
    }

    public getSearchValue():BehaviorSubject<string> {
        return this.search$;
    }
}