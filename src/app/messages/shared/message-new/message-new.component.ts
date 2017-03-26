import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from "../message.service";
import { Message } from "../message.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-message-new',
  styleUrls: ['./message-new.component.scss'],
  templateUrl: './message-new.component.html'
})

export class MessageNewComponent implements OnInit, OnDestroy {
  private userId: number = 2;
  private newMessage: Message = {
    id: 0,
    text: '',
    isRead: false,
    senderId: this.userId,
    sentAt: new Date(),
    chatId: 0
  }
  private subscription: Subscription;
  private scrollTimeOut;
  constructor(private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.newMessage.chatId = +params['id'];
      this.subscription = this.messageService.getAll().subscribe((messages) => this.newMessage.id = messages.length + 1)
    })
  }

  ngOnDestroy() {

  }

  onSumbit(form) {
    console.log(form.message)
    this.newMessage.text = form.message;
    this.messageService.addMessage(this.newMessage)
    console.log(this.newMessage)
  }

  onKeyPress(textArea: HTMLTextAreaElement) {
    clearTimeout(this.scrollTimeOut);
    this.scrollTimeOut = setTimeout(
      () => {
        let maxHeight = 110,
          minHeight = 50;
        if (textArea.scrollHeight < 110) {
          textArea.setAttribute('style', `height: ${textArea.scrollHeight}px;`)
        } else {
          textArea.setAttribute('style', `height: ${maxHeight}px;`)
        }
      },
      0);
  }

}
