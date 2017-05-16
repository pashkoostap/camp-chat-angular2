import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { API_CONFIG } from './api.config';
import { Observable } from 'rxjs';
import { Chat } from "../chats/shared";
import { UsersService } from "../users";

@Injectable()
export class SocketChatService {
  socket: any;
  constructor(private usersService: UsersService) {}
  initSocket(userToken, callback) {
    this.socket = io(API_CONFIG.SOCKET);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', { token: userToken });
      this.socket.on('authenticated', msg => {
        callback();
      })
      
      // this.socket.on('message', msg => console.log(msg));
      // this.socket.on('join', msg => console.log('join', msg));
      // this.socket.on('leave', msg => console.log('leave', msg));
      // this.socket.on('join-room', msg => console.log('join-room', msg));
      // this.socket.on('leave-room', msg => console.log('leave-room', msg));
      // this.socket.on('new-chat', chat => console.log('new-chat', chat));
    })
    this.socket.on('disconnect', ()=>{
      console.log('disconnect')
    })
  }

  sendMessage(msgObj: any) {
    this.socket.emit('message', msgObj);
  }

  joinRoom(roomID: string) {
    this.socket.emit('join-room', roomID);
  }

  leaveRoom(roomID: string) {
    this.socket.emit('leave-room', roomID);
  }

  newChat(chat: Chat) {
    this.socket.emit('new-chat', chat);
  }

  disconnect() {
    this.socket.disconnect();
  }

  getSocket(): Observable<any> {
    return Observable.create(observer => observer.next(this.socket));
  }
}