import { Component, EventEmitter, Output } from '@angular/core';
import { ChatService } from "../shared";

@Component({
  selector: 'ct-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.scss']
})

export class ChatNavComponent {
  @Output() isLeftChatOpen = new EventEmitter<boolean>();
  private isMenuOpen: boolean = false;
  private isChatPanelOpen: boolean = false;
  private searchValue: string = '';
  constructor(private chatService: ChatService) { }

  onMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuClose() {
    this.isMenuOpen = false;
  }

  onBlur() {
    setTimeout(() => {
      this.searchValue = '';
      this.chatService.setSearchValue('');
    }, 300)
  }

  onChatPanelOpen() {
    if (this.isChatPanelOpen) {
      this.isMenuOpen = false;
    }
    this.isChatPanelOpen = !this.isChatPanelOpen;
    this.isLeftChatOpen.emit(this.isChatPanelOpen);
  }

  onSearchValueChanged(value: string) {
    this.chatService.setSearchValue(value)
  }

}
