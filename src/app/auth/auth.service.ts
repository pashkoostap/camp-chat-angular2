import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_CONFIG } from '../shared/';
import { Observable } from 'rxjs';
import { User } from './login';
declare let fetch: any;

@Injectable()
export class AppAuthService {
  constructor(private http: Http) { }
  get isLoggedIn() {
    return localStorage.getItem('userInfo') && localStorage.getItem('userInfo').length > 0 ? true : false;
  }

  login(data) {
    return this.http.post(API_CONFIG.LOGIN, data).map(res => res.json());
  }

  register(data, callBack) {
    return this.http.post(API_CONFIG.SIGNUP, data).subscribe(res => {
      console.info('registered a new user');
      callBack();
    })
   }

  logout() {
    localStorage.setItem('userInfo', '');
  }

  setUserState(state: any): void {
    localStorage.setItem('userInfo', JSON.stringify(state));
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}