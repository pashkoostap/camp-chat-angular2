import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Chat, ChatService } from '../shared';
import { Subscription } from 'rxjs';
import { AppAuthService } from "../../auth";

@Component({
  selector: 'ct-chat-list',
  styleUrls: ['./chat-list.component.scss'],
  templateUrl: './chat-list.component.html'
})

export class ChatListComponent implements OnInit, OnDestroy {
  public chats: any[];
  public searchValue: string = '';
  private selectedId: number;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private auth: AppAuthService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.chatService.getChats().subscribe(
        chats => this.chats = chats, error => console.log(error)
      ),
      this.chatService.getSearchValue().subscribe(value => this.searchValue = value)
    )
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  select(chat) {
    this.selectedId = chat.id;
    this.router.navigate(['chat', chat._id])
  }
}
