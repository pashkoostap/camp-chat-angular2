import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Chat } from './shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-chats',
  styleUrls: ['./chats.component.scss'],
  templateUrl: './chats.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ChatsComponent implements OnInit {
  isChatPanelOpen: boolean = false;

  constructor() { }

  ngOnInit() { }

  onChatPanelOpen(event: boolean) {
    this.isChatPanelOpen = event;
  }
}
