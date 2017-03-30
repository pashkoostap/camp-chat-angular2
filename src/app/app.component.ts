import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app works!';
  socket;
  constructor() {

  }
  getRequest() {
    this.socket = io.connect('http://front-camp-chat.herokuapp.com/', {
      forceNew: true
    });
    this.socket.on('error', () => console.log(this.socket))

    this.socket.on('connect', () => console.log('connect'))
    this.socket.on('error', () => console.log('error'))
    console.info('get')
  }

  sendMessage() {
    console.info('send')
    this.socket.emit('message', 'new message');
  }

}
