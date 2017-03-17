import { Injectable } from '@angular/core';
import { MESSAGES } from './';

@Injectable()
export class MessageService {
    getAll(id: number) {
        return Promise.resolve(MESSAGES.filter((el) => {
            return el.chatId == id;
        }))
    }
}