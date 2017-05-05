import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared/api.config';
import { Message } from './message.model';
import { BehaviorSubject, Subject } from 'rxjs';
declare let window: any;

@Injectable()
export class MessageService {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  private messageSubject: Subject<any> = new Subject();
  private messages: Message[] = [];
  private initRequest: Message[] = [];
  constructor(private http: Http) {
    this.initRequest = this._getInitMessages();
  }

  _getInitMessages() {
    return window.fetch(API_CONFIG.GET_MESSAGES_CHAT_NAME)
      .then(res => res.json())
      .then(messages => {
        messages.forEach(message => {
          if (typeof message.msg === 'string') {
            this.messages.push(message);
          }
        })
        this.messageSubject.next(this.messages)
      });
  }
  _loadMessages() {
    return this.http.get(API_CONFIG.GET_MESSAGES_CHAT_NAME).map(res => res.json());
  }

  _getMessages() {
    return this.messageSubject;
  }

  getMessagesByChatId(id: string) {
    return this.http.get(`${API_CONFIG.GET_MESSAGES_CHAT_ID}/${id}`).map(messages => messages.json())
  }

  _sendMessage(message: Message) {
    this.messages = [...this.messages, message];
    this.messageSubject.next(this.messages);
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}