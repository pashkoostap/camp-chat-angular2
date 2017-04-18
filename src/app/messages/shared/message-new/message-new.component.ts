import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from "../message.service";
import { Message } from "../message.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { AppAuthService } from "../../../auth";

@Component({
  selector: 'ct-message-new',
  styleUrls: ['./message-new.component.scss'],
  templateUrl: './message-new.component.html'
})

export class MessageNewComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private scrollTimeOut;
  constructor(private messageService: MessageService,
    private route: ActivatedRoute,
    private authService: AppAuthService) { }

  ngOnInit() {
    this.subscription = this.messageService._getMessages().subscribe(arr => console.log(arr));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSumbit(form) {
    let message = {
      msg: form.message,
      user: this.authService.getUserInfo().user,
      time: new Date().getTime()
    }
    this.messageService._sendMessage(message);
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
