import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { API_CONFIG } from './api.config';
import { Observable } from 'rxjs';

@Injectable()
export class SocketChatService {
  socket: any;
  initSocket(userToken, callback) {
    this.socket = io(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: userToken });
      callback();
      this.socket.on('message', msg => console.log(msg));
      this.socket.on('join', msg => console.log('join', msg));
      this.socket.on('leave', msg => console.log('leave', msg));
      this.socket.on('join-room', msg => console.log('join-room', msg));
    })
  }

  sendMessage(msgObj: any) {
    this.socket.emit('message', msgObj);
  }

  joinRoom(roomID: string) {
    this.socket.emit('join-room', roomID);
  }

  getSocket(): Observable<any> {
    return Observable.create(observer => observer.next(this.socket));
  }
}