import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_CONFIG } from './api.config';
import { Observable } from 'rxjs';

@Injectable()
export class SocketChatService {
  socket: any;
  constructor() { }
  initSocket(token, callback) {
    this.socket = io(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhc2hrb09zdGFwIn0.qDBVTt_QG2BB8jnqKvJwUxQTTMQfQnny1_XfoEMGC7w" });
      console.log(this.socket);
      callback();
    })
  }
  getSocket(): Observable<any> {
    return Observable.create(observer => observer.next(this.socket));
  }
}