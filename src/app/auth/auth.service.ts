import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_CONFIG } from '../shared/';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }
    get isLoggedIn() {
        return localStorage.getItem('token') == '' ? false : true;
    }

    // login(user) {
    //     if (user) {
    //         localStorage.setItem('token', 'youlogged');
    //     }
    // }
    login(data) {
        return this.http.post(API_CONFIG.LOGIN, data).map(res => res.json());
    }

    register() {

    }

    logout() {
        localStorage.setItem('token', '');
    }
}