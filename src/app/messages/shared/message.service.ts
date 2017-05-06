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
  private initRequest: Message[] = [];
  constructor(private http: Http,
    private chatService: ChatService) {
    this.getMessagesForChats();
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