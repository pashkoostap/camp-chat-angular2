import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_CONFIG } from './api.config';
import { Observable } from 'rxjs';

@Injectable()
export class SocketChatService {
  socket: any;
  constructor() { }
  initSocket(userToken, callback) {
    this.socket = io(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: userToken });
      console.log(this.socket);
      callback();
    })
  }
  getSocket(): Observable<any> {
    return Observable.create(observer => observer.next(this.socket));
  }
}