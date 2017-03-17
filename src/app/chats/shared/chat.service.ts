import { Injectable } from '@angular/core';
import { CHATS } from './mock-chats';

@Injectable()
export class ChatService {
    getAll() {
        return Promise.resolve(CHATS);
    }
}