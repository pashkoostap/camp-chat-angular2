import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { AppAuthService } from "../../../auth";
import { SocketChatService } from "../../../shared";

@Component({
  selector: 'ct-message-new',
  styleUrls: ['./message-new.component.scss'],
  templateUrl: './message-new.component.html'
})

export class MessageNewComponent {
  private subscription: Subscription;
  private scrollTimeOut;
  constructor(private socketService: SocketChatService,
    private route: ActivatedRoute,
    private authService: AppAuthService) { }

  onSumbit(form) {
    let message = {
      msg: form.message,
      user: this.authService.getUserInfo().user,
      time: new Date().getTime()
    }
    this.socketService.sendMessage(form.message);
  }

  onKeyPress(textArea: HTMLTextAreaElement) {
    clearTimeout(this.scrollTimeOut);
    this.scrollTimeOut = setTimeout(() => {
      let maxHeight = 110,
        minHeight = 50;
      if (textArea.scrollHeight < 110) {
        textArea.setAttribute('style', `height: ${textArea.scrollHeight}px;`)
      } else {
        textArea.setAttribute('style', `height: ${maxHeight}px;`)
      }
    }, 0);
  }
}
