import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UsersService } from '../../users/';
import { Chat, ChatService } from '../shared/';
import { AppAuthService } from "../../auth";

@Component({
  selector: 'ct-chat-new',
  styleUrls: ['./chat-new.component.scss'],
  templateUrl: './chat-new.component.html'
})

export class ChatNewComponent implements OnInit, OnDestroy {
  users: User[];
  userId: number = 1;
  isUserChecked: boolean = false;
  subscriptions: Subscription[] = [];
  searchValue: string = '';
  searchMatches: number = 0;
  isSearchFieldActive: boolean = false;
  newChatElement: any;
  newChat: Chat = {
    chatname: '',
    users: []
  };
  constructor(private usersService: UsersService,
    private auth: AppAuthService,
    public element: ElementRef,
    private chatService: ChatService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.usersService.getAllUsers().subscribe(
        users => this.users = users.filter(user => user.username !== this.auth.getUserInfo().user.username),
        error => console.log(error)
      ),
      this.usersService.getSearchValue().subscribe(value => this.searchValue = value)
    )
    this.newChatElement = this.element.nativeElement;
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  onAddUser(selectedEl: HTMLLIElement, user: User, i: number) {
    selectedEl.classList.toggle('selected');
    let userObj: any = { username: this.users[i].username };
    if (selectedEl.classList.contains('selected')) {
      this.newChat.users.push(userObj);
    } else {
      this.newChat.users.splice(userObj, 1);
    }
    this.isUserChecked = this.newChat.users.length > 0;
  }

  onSearchValueChanged(value: string = '', el: HTMLUListElement) {
    this.usersService.setSearchValue(value);
    setTimeout(() => {
      if (!value) {
        this.isSearchFieldActive = true;
      } else {
        this.isSearchFieldActive = false;
      }
      this.searchMatches = el.querySelectorAll('li').length;
    }, 100)
  }

  onSearchFieldClear(input: HTMLInputElement, usersList: HTMLUListElement) {
    this.cleareSearchResults(usersList);
    input.value = '';
  }

  onSubmit(event, form, usersList: HTMLUListElement) {
    event.preventDefault();
    this.newChat.chatname = form.controls['chatname'].value;
    this.cleareSearchResults(usersList);
    this.newChatElement.querySelector('.new-chat-form__input').value = '';
    this.chatService.createNewChat(this.newChat);
    console.log(this.newChat);
  }

  cleareSearchResults(list: HTMLUListElement) {
    this.searchValue = '';
    this.usersService.setSearchValue('');
    this.isSearchFieldActive = false;
    Array.prototype.forEach.call(list.querySelectorAll('li'),
      (el) => { return el.classList.remove('selected') }
    );
    list.scrollTop = 0;
  }
}
