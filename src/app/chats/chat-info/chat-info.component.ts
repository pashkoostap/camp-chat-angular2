import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../messages/shared/';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Chat } from '../shared';
import { Subscription } from 'rxjs';
import { User } from "app/users";

@Component({
  selector: 'ct-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  private chatId: string;
  private chat: Chat;
  private chats: Chat[];
  public users: any[] = [];
  public chatname: string = '';
  public maxWidthValue: number = 0;
  public searchValue: string = '';
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private messageService: MessageService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatId = params['id'];
      if (this.chats) {
        this.updateChatInfo()
      }
      this.subscription = this.chatService.getChats().subscribe(
        chats => {
          this.chats = chats;
          this.updateChatInfo()
        }
      )
    })
  }

  setAttendessWrapWidth(elWidth: number, elOffset?: number) {
    if (!elOffset) {
      return this.users.length * elWidth;
    } else {
      return this.users.length * elWidth - (this.users.length - 1) * elOffset;
    }
  }

  updateChatInfo() {
    this.chat = this.chats.filter(chat => chat._id === this.chatId)[0];
    this.chatname = this.chat.chatname;
    this.users = this.chat.users;
    this.maxWidthValue = this.setAttendessWrapWidth(50, 30);
  }

  onAttendessShow(el: HTMLUListElement) {
    this.maxWidthValue = this.setAttendessWrapWidth(50);
    el.classList.add('selected')
  }

  onAttendessHide(el: HTMLUListElement) {
    this.maxWidthValue = this.setAttendessWrapWidth(50, 30);
    el.classList.remove('selected')
  }

  onSearchFieldOpen(el: HTMLDivElement) {
    el.classList.toggle('visible');
  }

  onBlur() {
    // setTimeout(() => {
    //   this.searchValue = '';
    //   this.messageService.setSearchValue('');
    // }, 300)
  }

  onSearchValueChanged(value: string) {
    this.messageService.setSearchValue(value)
  }

  onChatInfoWrapShow(wrapEl: HTMLDivElement, btn: HTMLButtonElement) {
    wrapEl.classList.toggle('visible');
    btn.classList.toggle('clicked');
    if (btn.classList.contains('clicked')) {
      btn.innerText = 'Hide chat info';
    } else {
      btn.innerText = 'Show chat info';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
