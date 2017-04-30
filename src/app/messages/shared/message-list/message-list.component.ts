import { Component, OnInit, OnDestroy, ViewEncapsulation, DoCheck, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { AppAuthService } from "../../../auth";
import { SocketChatService } from "../../../shared";

@Component({
  selector: 'ct-message-list',
  styleUrls: ['./message-list.component.scss'],
  templateUrl: './message-list.component.html',
  encapsulation: ViewEncapsulation.None
})

export class MessageListComponent implements OnInit, OnDestroy, DoCheck {
  private chatId: number;
  private loggedUser: Object = {};
  private messages: Message[] = [];
  private subscriptions: Subscription[] = [];
  private searchValue: string = '';
  private msgList: HTMLUListElement;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authService: AppAuthService,
    private socketService: SocketChatService,
    public element: ElementRef) { }

  ngOnInit() {
    this.loggedUser = this.authService.getUserInfo().user;
    this.route.params.subscribe((params: Params) => {
      this.chatId = +params['id'];
      this.subscriptions.push(
        this.messageService._getMessages().subscribe(
          messages => this.messages = messages, error => console.error(error)
        ),
        this.messageService.getSearchValue().subscribe(value => this.searchValue = value),
        this.socketService.getSocket().subscribe(socket => {
          socket.on('message', msg => {
            this.messageService._sendMessage(msg);
          })
        })
      )
    })
    this.msgList = this.element.nativeElement.querySelector('.right-chat-messages');
  }
  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
  ngDoCheck() {
    this.setScrollHeight();
  }
  setScrollHeight() {
    this.msgList.scrollTop = this.msgList.scrollHeight - this.msgList.offsetHeight;
  }
}
