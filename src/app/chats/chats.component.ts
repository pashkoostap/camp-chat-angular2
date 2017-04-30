import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ct-chats',
  styleUrls: ['./chats.component.scss'],
  templateUrl: './chats.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ChatsComponent {
  isChatPanelOpen: boolean = false;

  onChatPanelOpen(event: boolean) {
    this.isChatPanelOpen = event;
  }
}
