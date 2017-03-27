import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../messages/shared/';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Chat } from '../shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  private chatId: number;
  private attendees: number[] = [];
  private chatName: string = '';
  private maxWidthValue: number = 0;
  private searchValue: string = '';
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private messageService: MessageService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.chatId = +params['id'];
      this.subscription = this.chatService.getChatParamsByChatId(this.chatId).subscribe(
        (chat) => {
          this.attendees = chat.attendees;
          this.chatName = chat.name;
        }
      )
    })
    this.maxWidthValue = this.setAttendessWrapWidth(50, 30);
  }

  setAttendessWrapWidth(elWidth: number, elOffset?: number) {
    if (!elOffset) {
      return this.attendees.length * elWidth;
    } else {
      return this.attendees.length * elWidth - (this.attendees.length - 1) * elOffset;
    }
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
