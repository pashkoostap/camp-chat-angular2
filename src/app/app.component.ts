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
  constructor(private socketChatService: SocketChatService) {
  }
  ngOnInit() {
    socket.on('connect', () => {
      console.log(socket);
      socket.emit('authenticate', { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhc2hrb09zdGFwIn0.qDBVTt_QG2BB8jnqKvJwUxQTTMQfQnny1_XfoEMGC7w" })
    })
    socket.on('message', msg => {
      console.log(msg)
    });
  }
  getRequest() {
    socket.emit('message', 'Third message')
  }
}
