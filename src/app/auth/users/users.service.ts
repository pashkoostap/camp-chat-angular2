import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { USERS } from './mock-users';
import { User } from './user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { API_CONFIG } from '../../shared';

@Injectable()
export class UsersService {
    private search$: BehaviorSubject<string> = new BehaviorSubject('');
    constructor(private http: Http) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get(API_CONFIG.USERS).map(res => res.json());
    }

    public setSearchValue(value: string):void {
        this.search$.next(value);
    }

    public getSearchValue():BehaviorSubject<string> {
        return this.search$;
    }
}