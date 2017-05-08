import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Chat, ChatService } from '../shared';
import { Subscription } from 'rxjs';
import { AppAuthService } from "../../auth";
import { SocketChatService } from "../../shared";

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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private auth: AppAuthService,
    private socketService: SocketChatService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
      this.subscriptions.push(
        this.chatService.getChats().subscribe(
          chats => {
            if (chats) {
              this.chats = chats;
              chats.forEach(chat => {
                this.socketService.joinRoom(chat._id);
              })
            }
          }, error => console.log(error)
        ),
        this.chatService.getSearchValue().subscribe(value => this.searchValue = value)
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
    this.router.navigate(['chat', chat._id])
  }
}
