import { Component, OnInit } from '@angular/core';
import { SocketChatService, SpinnerComponent } from "./shared";
import { AppAuthService } from "./auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  socket;  
  userInfo;
  constructor(
    private authService: AppAuthService,
    private socketChatService: SocketChatService) {
  }
  ngOnInit() {
    this.initSocket();
  }
  initSocket() {
    if (this.authService.isLoggedIn) {
      this.userInfo = this.authService.getUserInfo();
      this.socket = this.socketChatService.initSocket(this.userInfo.token, () => {
        // console.log(this.userInfo);
      });
    }
  }
}
