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
  private messagesSubject: Subject<any> = new Subject();
  private messages: Message[] = [];
  private newMessages: Message[] = [];
  private newMessagesSubject: Subject<any> = new Subject();
  constructor(private http: Http,
    private chatService: ChatService) { }

  getMessages() {
    return this.messagesSubject;
  }

  getInitMessages(chatID) {
    return this.getMessagesByChatId(chatID).subscribe(messages => {
      this.messages = messages;
      this.messagesSubject.next(this.messages);
    })
  }

  getMessagesByChatId(id: string) {
    return this.http.get(`${API_CONFIG.GET_MESSAGES_CHAT_ID}/${id}`).map(messages => messages.json())
  }

  sendMessage(message: Message, chatID: string) {
    if (message.chatID === chatID) {
      this.messages = [...this.messages, message];
      this.messagesSubject.next(this.messages);
    } else {
      this.newMessages.push(message);
      this.newMessagesSubject.next(this.newMessages);
    }
  }

  updateNewMessages(chatID: string) {
    this.newMessages = this.newMessages.filter(message => message.chatID !== chatID);
    this.newMessagesSubject.next(this.newMessages);
  }

  getNewMessages() {
    return this.newMessagesSubject;
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}