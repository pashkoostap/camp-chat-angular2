import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_CONFIG } from './api.config';
import { Observable} from 'rxjs';

@Injectable()
export class SocketChatService {
  socket: any;
  constructor() {
    // this.socket = io.connect(API_CONFIG.SOCKET);
  }
  initSocket() {
    this.socket = io(API_CONFIG.SOCKET);
    this.socket.on('connect', () => { console.log(this.socket) })
  }
  initSocketAfterLogin(loginToken: string) {
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: loginToken })
    })
  }
  getSocket():Observable<any> {
    return Observable.create(observer => observer.next(this.socket));
  }
}