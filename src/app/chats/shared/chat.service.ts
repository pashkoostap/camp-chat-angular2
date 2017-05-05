import { Injectable } from '@angular/core';
import { Chat } from './chat.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared';
import { AppAuthService } from "app/auth";

@Injectable()
export class ChatService {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  private chats: Chat[];
  private chatsSubject: Subject<Chat[]> = new Subject();
  private chatSubject: Subject<Chat> = new Subject();
  private initChatsRequest: any;
  constructor(private http: Http, private auth: AppAuthService) {
    this.initChatsRequest = this.getChatsByUserId(this.auth.getUserInfo().user._id).subscribe(res => {
      this.chats = res.chats;
      this.chatsSubject.next(this.chats);
    });
  }
  getChats(): Subject<Chat[]> {
    return this.chatsSubject;
  }

  getChatsByUserId(id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.GET_CHATS}/${id}`).map(res => res.json());
  }

  createNewChat(chat: Chat) {
    return this.http.post(API_CONFIG.NEW_CHAT, chat).subscribe(res => console.log(res.json()));
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}