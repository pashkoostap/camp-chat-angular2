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
  constructor(private http: Http) { }

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