import { Injectable } from '@angular/core';
import { Chat } from './chat.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Http } from "@angular/http";
import { API_CONFIG, SocketChatService } from '../../shared';
import { AppAuthService } from "app/auth";

@Injectable()
export class ChatService {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  private chats: Chat[];
  private chatsSubject: Subject<Chat[]> = new Subject();
  private chatSubject: Subject<Chat> = new Subject();
  private initChatsRequest: any;
  constructor(private http: Http,
    private auth: AppAuthService,
    private socketService: SocketChatService) {
    this.initChatsRequest = this.getChatsByUserId(this.auth.getUserInfo().user._id).subscribe(chats => {
      this.chats = chats;
      this.chatsSubject.next(this.chats);
    });
  }
  getChats(): Subject<Chat[]> {
    return this.chatsSubject;
  }

  getChatByID(id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.GET_CHAT_BY_ID}/${id}`).map(res => res.json());
  }

  getChatsByUserId(id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.GET_CHATS}/${id}`).map(res => res.json());
  }

  createNewChat(chat: Chat, callback: any) {
    return this.http.post(API_CONFIG.NEW_CHAT, chat).subscribe(res => {
      let chat = res.json().chat;
      this.socketService.newChat(chat);
      callback(chat, null)
    }, err => callback(null, err));
  }

  newChat(chat: any) {
    chat.users.forEach(user => {
      if (user._id === this.auth.getUserInfo().user._id) {
        this.chats = [...this.chats, chat];
        this.chatsSubject.next(this.chats);
      }
    })
  }

  leaveChat(chatID: string, userID: string, callback) {
    this.http.post(API_CONFIG.LEAVE_CHAT, { chatID, userID }).subscribe(res => {
      let chats = this.chats.filter(chat => chat._id !== chatID);
      this.chats = [...chats];
      this.chatsSubject.next(this.chats);
      callback();
    }, err => {
      console.log(err);
    })
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}