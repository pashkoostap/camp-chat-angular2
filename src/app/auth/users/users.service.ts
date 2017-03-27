import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { USERS } from './mock-users';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../shared';

@Injectable()
export class UsersService {
    constructor(private http: Http) { }
    // getAllUsers(): Observable<User[]> {
    //     return Observable.create(observer => observer.next(USERS));
    // }

    getAllUsers(): Observable<User[]> {
        return this.http.get(API_CONFIG.USERS).map(res => res.json());
    }
}