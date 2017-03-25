import { Injectable } from '@angular/core';
import { MESSAGES } from './mock-messages';
import { Message } from './message.model';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
    getAll():Observable<Message[]> {
        return Observable.create(observer => observer.next(MESSAGES));
    }

    getMessageByChatId(id: number): Observable<Message[]> {
        const messages = MESSAGES.filter(chat => chat.chatId === id);
        return Observable.create(observer => observer.next(messages));
    }
}