import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ct-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.scss']
})

export class ChatNavComponent {
  isMenuOpen:boolean = false;
  isChatPanelOpen:boolean = false;
  @Output() isLeftChatOpen = new EventEmitter<boolean>();
  constructor() { }

  onMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onChatPanelOpen() {
    if (this.isChatPanelOpen) {
      this.isMenuOpen = false;
    }
    this.isChatPanelOpen = !this.isChatPanelOpen;
    this.isLeftChatOpen.emit(this.isChatPanelOpen)
  }

}
