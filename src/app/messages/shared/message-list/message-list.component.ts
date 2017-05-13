import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { AppAuthService } from "../../../auth";
import { SocketChatService, SpinnerComponent } from "../../../shared";
const parseUrl = require('parse-url');
declare var require: any

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
  private subscription: Subscription;
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
      this.isSpinnerVisible = true;
      this.isNoMessagesForChat = false;
      this.messages = [];
      this.chatId = params['id'];
      this.subscriptions.map(subscription => subscription.unsubscribe());
      this.subscriptions = new Array();
      this.subscriptions.push(
        this.messageService.getInitMessages(this.chatId),
        this.messageService.getMessages().subscribe(messages => {
          this.isSpinnerVisible = false;
          this.messages = messages;
          this.messages.forEach((message: any, i) => {
            message.msgText = this.detectContent(message.msg);
            // message.user.photoURL = this.satinizer.bypassSecurityTrustStyle(`url(${message.user.photo})`);
          });
          if (this.messages.length > 0) {
            this.isNoMessagesForChat = false;
          } else {
            this.isNoMessagesForChat = true;
          }
        }),
        this.messageService.getSearchValue().subscribe(value => this.searchValue = value),
      )
    })
    this.subscription = this.socketService.getSocket().subscribe(socket => {
      socket.on('message', msg => {
        this.messageService.sendMessage(msg, this.chatId);
      })
    })
    this.msgList = this.element.nativeElement.querySelector('.right-chat-messages');
  }
  ngOnDestroy() {
    this.subscriptions = [...this.subscriptions, this.subscription];
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
  ngAfterViewChecked() {
    this.setScrollHeight();
  }
  setScrollHeight() {
    this.msgList.scrollTop = this.msgList.scrollHeight - this.msgList.offsetHeight;
  }
  detectContent(text) {
    let textArr = text.split(' ');
    let imagePattern = /\.(jpeg|jpg|gif|png|svg|bmp|tiff)/g;
    let resultText = '';
    let resultImages = '';
    textArr.forEach(str => {
      let parsedLink = parseUrl(str);
      if (parsedLink.protocols.length > 0) {
        if (parsedLink.href.match(imagePattern)) {
          resultImages += `<a class='chat-image-link' href=${str} target='_blank'><img src=${str} /></a> `;
        } else {
          resultText += `<a class='chat-link' href=${str} target='_blank'>${parsedLink.resource}</a> `;
        }
      } else {
        resultText += `${str} `;
      }
    })
    return `${resultText}${resultImages}`;
  }
}