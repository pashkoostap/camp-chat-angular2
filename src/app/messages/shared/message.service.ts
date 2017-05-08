import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared/api.config';
import { Message } from './message.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatService } from "../../chats/shared";
declare let window: any;

@Injectable()
export class MessageService {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  private messageSubject: Subject<any> = new Subject();
  private messages: Message[] = [];
  private initMessagesRequest: any;
  private _routeSubject: Subject<any> = new Subject();
  constructor(private http: Http,
    private chatService: ChatService) {
    this.initMessagesRequest = this.chatService.getChats().subscribe(chats =>
      this.http.post(`${API_CONFIG.GET_MESSAGES_CHATS}`, { chats }).subscribe(res => {
        this.messages = res.json();
        this.messageSubject.next(this.messages);
      }, err => {
        this.messageSubject.next(this.messages);
      }))
  }

  getMessages() {
    return this.messageSubject;
  }

  _routeChange(id: string) {
    this.messages = [...this.messages];
    this.messageSubject.next(this.messages)
  }

  _getRouteChange() {
    return this._routeSubject;
  }

  getMessagesByChatId(id: string) {
    return this.http.get(`${API_CONFIG.GET_MESSAGES_CHAT_ID}/${id}`).map(messages => messages.json())
  }

  getMessagesForChats() {
    this.chatService.getChats().subscribe(chats =>
      this.http.post(`${API_CONFIG.GET_MESSAGES_CHATS}`, { chats }).subscribe(res => console.log(res.json()))
    )
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