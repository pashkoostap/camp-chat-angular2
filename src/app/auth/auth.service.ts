import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_CONFIG } from '../shared/';
declare let window: any;

@Injectable()
export class AppAuthService {
  constructor(private http: Http) { }
  get isLoggedIn() {
    return localStorage.getItem('userInfo') && localStorage.getItem('userInfo').length > 0 ? true : false;
  }

  login(data) {
    return this.http.post(API_CONFIG.LOGIN, data).map(res => res.json());
  }

  loginWithProviders(data, callBack) {
    return this.http.post(API_CONFIG.LOGIN_PROVIDERS, data).subscribe(res => {
      let user = res.json();
      callBack(user, null);
    }), err => {
      callBack(null, err.json());
    }
  }

  register(data, callBack) {
    return this.http.post(API_CONFIG.SIGNUP, data).subscribe(res => {
      let user = res.json();
      callBack(user, null);
    }, err => {
      callBack(null, err.json());
    })
  }

  logout() {
    localStorage.setItem('userInfo', '');
    window.connectedUsers = undefined;
  }

  setUserState(state: any): void {
    localStorage.setItem('userInfo', JSON.stringify(state));
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
