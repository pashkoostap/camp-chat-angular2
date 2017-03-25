import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ct-message-list',
  styleUrls: ['./message-list.component.scss'],
  templateUrl: './message-list.component.html'
})

export class MessageListComponent implements OnInit, OnDestroy {
  chatId: number;
  userId: number = 1;
  messages: Message[];
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.chatId = +params['id'];
      this.subscriptions.push(
        this.messageService.getMessageByChatId(this.chatId).subscribe(
          messages => this.messages = messages, error => console.error(error)
        )
      )
    })
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
