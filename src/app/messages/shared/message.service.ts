import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared/api.config';
import { Message } from './message.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
    return window.fetch(API_CONFIG.MESSAGES)
      .then(res => res.json())
      .then(res => {
        this.messages = res;
        this.messageSubject.next(this.messages)
      });
  }
  _loadMessages() {
    return this.http.get(API_CONFIG.MESSAGES).map(res => { return res.json() });
  }

  _getMessages() {
    return this.messageSubject;
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