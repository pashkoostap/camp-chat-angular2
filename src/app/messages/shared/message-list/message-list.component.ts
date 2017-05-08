import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { AppAuthService } from "../../../auth";
import { SocketChatService, SpinnerComponent } from "../../../shared";

@Component({
  selector: 'ct-message-list',
  styleUrls: ['./message-list.component.scss'],
  templateUrl: './message-list.component.html',
  encapsulation: ViewEncapsulation.None
})

export class MessageListComponent implements OnInit, OnDestroy, AfterViewChecked {
  private chatId: string;
  private loggedUser: Object = {};
  public messages: Message[] = [];
  private subscriptions: Subscription[] = [];
  public searchValue: string = '';
  private msgList: HTMLUListElement;
  public isSpinnerVisible: boolean = true;
  public isNoMessagesForChat: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authService: AppAuthService,
    private socketService: SocketChatService,
    public element: ElementRef,
    private satinizer: DomSanitizer) { }

  ngOnInit() {
    this.loggedUser = this.authService.getUserInfo().user;
    this.route.params.subscribe((params) => {
      this.chatId = params['id'];
      this.subscriptions.map(subscription => subscription.unsubscribe());
      this.subscriptions = new Array();
      this.subscriptions.push(
        this.messageService.getInitMessages(this.chatId),
        this.messageService.getMessages().subscribe(messages => {
          this.isSpinnerVisible = false;
          this.messages = messages;
          if (this.messages.length > 0) {
            this.isNoMessagesForChat = false;
          } else {
            this.isNoMessagesForChat = true;
          }
        }),
        this.messageService.getSearchValue().subscribe(value => this.searchValue = value),
      )
    })
    this.socketService.getSocket().subscribe(socket => {
      socket.on('message', msg => {
        if (msg.chatID == this.chatId) {
          this.messageService.sendMessage(msg);
        }
      })
    })
    this.msgList = this.element.nativeElement.querySelector('.right-chat-messages');
  }
  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
  ngAfterViewChecked() {
    this.setScrollHeight();
  }
  setScrollHeight() {
    this.msgList.scrollTop = this.msgList.scrollHeight - this.msgList.offsetHeight;
  }
}

// if (this.chatId !== params['id']) {
//         this.messageService._routeChange(params['id']);
//       }
// this.messageService.getMessages().subscribe(messages => {
//   this.isSpinnerVisible = false;
//   this.messages = messages.filter(message => {
//     if (message.chatID === this.chatId) {
//       // message.user.photoURL = this.satinizer.bypassSecurityTrustStyle(`url(${message.user.photo})`);
//       return true;
//     }
//   });
//   if (this.messages.length > 0) {
//     this.isNoMessagesForChat = false;
//   } else {
//     this.isNoMessagesForChat = true;
//   }
// }, error => console.error(error)),