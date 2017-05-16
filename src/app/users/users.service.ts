import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { API_CONFIG } from '../shared';

@Injectable()
export class UsersService {
  private search$: BehaviorSubject<string> = new BehaviorSubject('');
  public connectedUsersSubject: Subject<any[]> = new Subject();
  private connectedUsers: any[] = [];
  constructor(private http: Http) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get(API_CONFIG.USERS).map(res => res.json());
  }

  getUserById(id: string): Observable<User> {
    return this.http.get(API_CONFIG.USERS).map(res => res.json()).filter((res) => res.id === id)
  }

  getConnectedUsers(): Subject<any> {
    return this.connectedUsersSubject;
  }

  userConnected(users) {
    this.connectedUsers = [...users];
    this.connectedUsersSubject.next(this.connectedUsers);
    console.log(this.connectedUsers)
  }

  public setSearchValue(value: string): void {
    this.search$.next(value);
  }

  public getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }

}