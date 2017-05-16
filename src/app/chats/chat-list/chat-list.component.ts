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
  public searchValue: string = '';
  private selectedId: string;
  private subscriptions: Subscription[] = [];
  private socketSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private auth: AppAuthService,
    private socketService: SocketChatService,
    private messagesService: MessageService,
    private usersService: UsersService,
    private satinizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
      this.subscriptions.push(
        this.chatService.getChats().subscribe(chats => {
          if (chats) {
            this.chats = chats;
            this.chats.forEach(chat => {
              chat.lastMessage = null;
              chat.newMessages = null;
              // chat.photoURL = this.satinizer.bypassSecurityTrustStyle(`url(${chat.photo})`);
              this.socketService.joinRoom(chat._id);
            })
          }
        }, error => console.log(error)
        ),
        this.chatService.getSearchValue().subscribe(value => this.searchValue = value),
        this.messagesService.getNewMessages().subscribe(newMessages => {
          this.chats.forEach(chat => {
            chat.newMessages = 0;
            newMessages.forEach((message, i) => {
              if (chat._id === message.chatID) {
                chat.newMessages += 1;
                if (i == newMessages.length - 1) {
                  chat.lastMessage = message;
                }
              }
            })
          })
        }),
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
        })
      )
    })
  }

  leaveChats() {
    this.chats.forEach(chat => {
      this.socketService.leaveRoom(chat._id);
    })
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
    this.leaveChats();
  }

  select(chat) {
    this.selectedId = chat._id;
    if (chat.lastMessage && chat.newMessages) {
      chat.lastMessage = null;
      chat.newMessages = null;
      this.messagesService.updateNewMessages(this.selectedId);
    }
    this.router.navigate(['chat', chat._id])
  }
}
