import { Injectable } from '@angular/core';
import { MESSAGES } from './mock-messages';
import { Message } from './message.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private search$: BehaviorSubject<string> = new BehaviorSubject('');
    getAll():Observable<Message[]> {
        return Observable.create(observer => observer.next(MESSAGES));
    }

    getMessageByChatId(id: number): Observable<Message[]> {
        const messages = MESSAGES.filter(chat => chat.chatId === id);
        return Observable.create(observer => observer.next(messages));
    }

    public setSearchValue(value: string):void {
        this.search$.next(value);
    }

    public getSearchValue():BehaviorSubject<string> {
        return this.search$;
    }
}