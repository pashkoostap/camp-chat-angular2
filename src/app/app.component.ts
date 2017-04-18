import { Component, OnInit } from '@angular/core';
import { SocketChatService } from "./shared";
import { AppAuthService } from "./auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app works!';
  socket;
  userInfo;
  constructor(
    private authService: AppAuthService,
    private router: Router,
    private socketChatService: SocketChatService) {
  }
  ngOnInit() {
    this.initSocket();
  }
  initSocket() {
    if (this.authService.isLoggedIn) {
      this.userInfo = this.authService.getUserInfo();
      this.socket = this.socketChatService.initSocket(this.userInfo.token, () => {
        console.log(this.userInfo);
      });
    }
  }
  getRequest() {
    // this.socketObj = this.socketChatService.getSocket().subscribe(
    //   res => {
    //     res.on('message', msg => console.log(msg));
    //     res.emit('message', 'Message text');
    //   }
    // )
  }
}
