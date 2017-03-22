import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Chat, ChatService } from './shared';

@Component({
  selector: 'ct-chats',
  styleUrls: ['./chats.component.scss'],
  templateUrl: './chats.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ChatsComponent implements OnInit {
  chats: Promise<Chat[]>;
  isChatPanelOpen: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chats = this.chatService.getAll();
  }

  onChatPanelOpen(event: boolean) {
    this.isChatPanelOpen = event;
  }
}
