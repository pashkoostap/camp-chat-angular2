import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Observable, Subscription } from 'rxjs';
import { AppAuthService } from "../../../auth";

@Component({
  selector: 'ct-message-list',
  styleUrls: ['./message-list.component.scss'],
  templateUrl: './message-list.component.html',
  encapsulation: ViewEncapsulation.None
})

export class MessageListComponent implements OnInit, OnDestroy {
  private chatId: number;
  private loggedUser: Object = {};
  private messages: Message[] = [];
  private subscriptions: Subscription[] = [];
  private searchValue: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authService: AppAuthService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getUserInfo().user;
    this.route.params.subscribe((params: Params) => {
      this.chatId = +params['id'];
      this.subscriptions.push(
        this.messageService._getMessages().subscribe(
          messages => this.messages = messages, error => console.error(error)
        ),
        this.messageService.getSearchValue().subscribe(value => this.searchValue = value)
      )
    })
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
