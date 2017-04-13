import { Component, OnInit } from '@angular/core';
import { SocketChatService } from "./shared";
import * as io from 'socket.io-client';
// let socket = io('http://eleksfrontendcamp-mockapitron.rhcloud.com:8000/');

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

  }
  getRequest() {
    this.socketObj = this.socketChatService.getSocket().subscribe(
      res => {
        res.on('message', msg => console.log(msg));
        res.emit('message', 'Message text');
      }
    )
  }
}
