import { Injectable } from '@angular/core';
import { MESSAGES } from './mock-messages';
import { Message } from './message.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private messagesArr: Message[] = MESSAGES;
    private search$: BehaviorSubject<string> = new BehaviorSubject('');
    getAll():Observable<Message[]> {
        return Observable.create(observer => observer.next(this.messagesArr));
    }

    getMessageByChatId(id: number): Observable<Message[]> {
        const messages = this.messagesArr.filter(chat => chat.chatId === id);
        return Observable.create(observer => observer.next(messages));
    }

    addMessage(message: Message) {
        this.messagesArr.push(message);
        console.log(this.messagesArr);        
    }

    public setSearchValue(value: string):void {
        this.search$.next(value);
    }

    public getSearchValue():BehaviorSubject<string> {
        return this.search$;
    }
}