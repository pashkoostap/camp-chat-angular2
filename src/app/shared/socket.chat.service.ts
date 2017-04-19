import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { API_CONFIG } from './api.config';
import { Observable } from 'rxjs';
// import { MessageService } from '../messages/shared/';

@Injectable()
export class SocketChatService {
  socket: any;
  initSocket(userToken, callback) {
    this.socket = io(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: userToken });
      console.log(this.socket);
      callback();
      this.socket.on('message', msg => console.log(msg));
      this.socket.on('join', msg => console.log('join', msg));
      this.socket.on('leave', msg => console.log('leave', msg));
    })

  }
  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getSocket(): Observable<any> {
    return Observable.create(observer => observer.next(this.socket));
  }
}