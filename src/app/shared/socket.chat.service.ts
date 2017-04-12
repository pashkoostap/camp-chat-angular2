import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import API_CONFIG from './api.config';

@Injectable()

export class SockeChatService {
  socket: any;
  constructor() {
    this.socket = io.connect(API_CONFIG.SOCKET);
  }
  initSocketAfterLogin(loginToken: string) {
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: loginToken })
    })
  }
}