import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { Chat, ChatService } from '../shared';
import { AppAuthService } from "../../auth";
import { SocketChatService } from "../../shared";
import { MessageService } from "../../messages";
import { UsersService } from "../../users";

@Component({
  selector: 'ct-chat-list',
  styleUrls: ['./chat-list.component.scss'],
  templateUrl: './chat-list.component.html'
})

export class ChatListComponent implements OnInit, OnDestroy {
  public chats: any[];
  public initChats: any[] = this.getNewMessages();
  public searchValue: string = '';
  private subscriptions: Subscription[] = [];
  private socketSubscription: Subscription;
  private activeChat: string = '';

  constructor(private chatService: ChatService,
    private auth: AppAuthService,
    private socketService: SocketChatService,
    private messagesService: MessageService,
    private usersService: UsersService,
    private satinizer: DomSanitizer) { }

  ngOnInit() {
    this.activeChat = window.location.pathname.slice(6);
    this.subscriptions.push(
      this.chatService.getChats().subscribe(chats => {
        if (chats) {
          this.chats = chats;
          this.chats.forEach(chat => {
            if (this.initChats.length > 0) {
              this.initChats.forEach(initChat => {
                if (initChat._id == chat._id) {
                  chat.newMessages = initChat.newMessages;
                  chat.lastMessage = initChat.lastMessage;
                }
              })
            } else if (!chat.newMessages) {
              chat.newMessages = 0;
            }

            chat.photoURL = this.satinizer.bypassSecurityTrustStyle(`url(${chat.photo})`);
            this.socketService.joinRoom(chat._id);
          })
        }
      }, error => console.log(error)
      ),
      this.chatService.getSearchValue().subscribe(value => this.searchValue = value),
      this.socketService.getSocket().subscribe(socket => {
        socket.on('new-chat', chat => {
          this.chatService.newChat(chat);
        })
        socket.on('join', res => {
          this.usersService.userConnected(res.connectedUsers);
        });
        socket.on('leave', res => {
          this.usersService.userConnected(res.connectedUsers);
        });
        socket.on('message', message => {
          this.chats.forEach((chat, i) => {
            if (chat._id == message.chatID && this.activeChat != message.chatID) {
              chat.newMessages += 1;
              chat.lastMessage = message;
            }
            if (i == this.chats.length - 1) {
              this.setNewMessages();
            }
          })
        })
      })
    )
  }

  leaveChats() {
    this.chats.forEach(chat => {
      this.socketService.leaveRoom(chat._id);
    })
  }

  setNewMessages() {
    localStorage.setItem('newMessages', JSON.stringify(this.chats));
  }

  getNewMessages() {
    let storage = localStorage.getItem('newMessages');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  }

  onChatSelect(chat) {
    chat.newMessages = 0;
    chat.lastMessage = null;
    this.activeChat = chat._id;
    this.setNewMessages();
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
    this.leaveChats();
  }
}
