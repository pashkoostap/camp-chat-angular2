import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { API_CONFIG } from '../shared';
declare let window: any;

@Injectable()
export class UsersService {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  public connectedUsersSubject: Subject<any[]> = new Subject();
  private connectedUsers: any[] = [];
  private initRequest: any;
  constructor(private http: Http) {
    this.initRequest = this.getInitConnectedUsers();
  }

  getInitConnectedUsers() {
    return this.http.get(API_CONFIG.CONNECTED_USERS).subscribe(res => {
      this.connectedUsers = res.json();
    })
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(API_CONFIG.USERS).map(res => res.json());
  }

  getUserById(id: string): Observable<User> {
    return this.http.get(API_CONFIG.USERS).map(res => res.json()).filter((res) => res.id === id)
  }

  getConnectedUsers(): Subject<any> {
    return this.connectedUsersSubject;
  }

  changedRoute() {
    this.connectedUsers = [...this.connectedUsers];
    this.connectedUsersSubject.next(this.connectedUsers);
  }

  userConnected(users) {
    this.connectedUsers = [...users];
    this.connectedUsersSubject.next(this.connectedUsers);
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}