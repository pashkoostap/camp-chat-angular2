import { Component } from '@angular/core';
import { SocketChatService } from "./shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app works!';
  constructor(private socketChatService: SocketChatService) { }
}
