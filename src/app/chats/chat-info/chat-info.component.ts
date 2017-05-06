import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../messages/shared/';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService, Chat } from '../shared';
import { Subscription } from 'rxjs';
import { User } from "app/users";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'ct-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  private chatId: string;
  private chats: Chat[] = [];
  public users: any[] = [];
  public chatname: string = '';
  public maxWidthValue: number = 0;
  public searchValue: string = '';
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private chatService: ChatService,
    private satinizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatId = params['id'];
      this.subscription = this.chatService.getChatByID(this.chatId).subscribe(
        chat => {
          this.chatname = chat.chatname;
          this.users = chat.users;
          this.maxWidthValue = this.setAttendessWrapWidth(50, 30);
          this.users.forEach(user => {
            user.photo = this.satinizer.bypassSecurityTrustStyle(`url(${user.photo})`);
          })
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

  navigateToUserProfile(user) {
    this.router.navigate(['users', user._id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
