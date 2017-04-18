import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared/api.config';
import { MESSAGES } from './mock-messages';
import { Message } from './message.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
declare let window: any;

@Injectable()
export class MessageService {
  private messagesArr: Message[] = MESSAGES;
  private search$: BehaviorSubject<string> = new BehaviorSubject('');

  private msg: Subject<any> = new Subject();
  private msgArr: any = [];
  initRequest;
  initMessages: any = [];
  constructor(private http: Http) {
    this.initMessages = this._getInitMessages();
  }


  _getInitMessages() {
    return window.fetch(API_CONFIG.MESSAGES)
      .then(res => res.json())
      .then(res => {
        this.msgArr = res;
        this.msg.next(this.msgArr)
      });
  }
  _loadMessages() {
    return this.http.get(API_CONFIG.MESSAGES).map(res => { return res.json() });
  }

  _getMessages() {
    return this.msg;
  }

  _sendMessage(message) {
    this.msgArr = [...this.msgArr, message];
    this.msg.next(this.msgArr);
  }

  getMessageByChatId(id: number): Observable<Message[]> {
    const messages = this.messagesArr.filter(chat => chat.chatId === id);
    return Observable.create(observer => observer.next(messages));
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}