import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_CONFIG } from '../shared/';
import { BehaviorSubject } from 'rxjs';
import { User } from './login';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private _state: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor(private http: Http) { }
    get isLoggedIn() {
        return localStorage.getItem('token') == '' ? false : true;
    }

    login(data) {
        return this.http.post(API_CONFIG.LOGIN, data).map(res => res.json());
    }

    register() { }

    logout() {
        localStorage.setItem('token', '');
    }

    setUserState(state: any):void {
        this._authenticated = true;
        this._state.next(state);
        localStorage.setItem('token', JSON.stringify(state));
    }

    getUserState():BehaviorSubject<any> {
        return this._state;
    }
}