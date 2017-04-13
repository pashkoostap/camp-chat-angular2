import { Component, OnInit } from '@angular/core';
import { SocketChatService } from "./shared";
import * as io from 'socket.io-client';
let socket = io('http://eleksfrontendcamp-mockapitron.rhcloud.com:8000/');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'app works!';
  socket;
  socketObj;
  constructor(private socketChatService: SocketChatService) {
  }
  ngOnInit() {
    this.socket = this.socketChatService.initSocket();
    // this.socket = this.socketChatService.initSocket();
    // this.socket.on('connect', () => {
    //   this.socket.emit('authenticate', { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhc2hrb09zdGFwIn0.qDBVTt_QG2BB8jnqKvJwUxQTTMQfQnny1_XfoEMGC7w" })
    //   console.log(this.socket);
    //   this.socket.on('message', msg => {
    //     console.log(msg)
    //   });
    // })
  }
  getRequest() {
    this.socketObj = this.socketChatService.getSocket().subscribe(socket => {
      socket.emit('authenticate', { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhc2hrb09zdGFwIn0.qDBVTt_QG2BB8jnqKvJwUxQTTMQfQnny1_XfoEMGC7w" });
      console.log(socket);
    });
    console.log(this.socketObj);
    // this.socket.emit('message', 'New text message')
  }
}
