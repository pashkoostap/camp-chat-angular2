import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User, UsersService } from '../../auth/users/'
import { Chat } from '../shared/';
import { Subscription } from 'rxjs';

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
  newChat: Chat = {
    id: this.userId,
    name: '',
    attendees: [],
    creator: this.userId,
    createdAt: new Date()
  };
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.usersService.getAllUsers().subscribe(
        users => this.users = users, error => console.log(error)
      ),
      this.usersService.getSearchValue().subscribe(value => this.searchValue = value)
    )
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  onAddUser(selectedEl: HTMLLIElement, user: User, i: number) {
    selectedEl.classList.toggle('selected');
    if (selectedEl.classList.contains('selected')) {
      this.newChat.attendees.push(i);
    } else {
      this.newChat.attendees.splice(this.newChat.attendees[i], 1);
    }
    this.isUserChecked = this.newChat.attendees.length > 0;
  }

  onSearchValueChanged(value: string = '', el: HTMLUListElement) {
    this.usersService.setSearchValue(value);
    setTimeout(() => {
      if (value.length > 0) {
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

  onSubmit(formValue, usersList: HTMLUListElement) {
    this.newChat.name = formValue.chatName;
    this.cleareSearchResults(usersList);
    console.log(formValue);
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
