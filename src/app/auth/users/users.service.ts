import { Injectable } from '@angular/core';
import { USERS } from './mock-users';
import { User } from './user.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
    private _authenticated: boolean = false;
    private _state: BehaviorSubject<any> = new BehaviorSubject<any>({});

    getAllUsers(): Observable<User[]> {
        return Observable.create(observer => observer.next(USERS));
    }

    setUserState(state: any):void {
        this._authenticated = true;
        this._state.next(state);
        console.log(this._state)
    }

    getUserState():BehaviorSubject<any> {
        return this._state;
    }

    public get authenticated(): boolean {
        return this._authenticated;
    }
}