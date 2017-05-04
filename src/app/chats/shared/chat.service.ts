import { Injectable } from '@angular/core';
import { CHATS } from './mock-chats';
import { Chat } from './chat.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared';

@Injectable()
export class ChatService {
  constructor(private http: Http) { }
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  getAll(): Observable<Chat[]> {
    return Observable.create(observer => observer.next(CHATS))
  }

  getChatParamsByChatId(id: number): Observable<Chat> {
    const chat = CHATS.filter(chat => chat.id === id);
    return Observable.create(observer => observer.next(CHATS.filter(chat => chat.id === id)[0]));
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