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
  isUsersWrapVisible: boolean = true;
  isUserChecked: boolean = false;
  subscriptions: Subscription[] = [];
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
      )
    )
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  onAddUser(event, user: User, i: number) {
    event.target.classList.toggle('selected');
    if (event.target.classList.contains('selected')) {
      this.newChat.attendees.push(i);
    } else {
      this.newChat.attendees.splice(this.newChat.attendees[i], 1);
    }
    this.isUserChecked = this.newChat.attendees.length > 0;
  }

  onOnenUsersWrap() {
    this.isUsersWrapVisible = !this.isUsersWrapVisible;
  }

  onSubmit(formValue) {
    this.newChat.name = formValue.chatName;
    console.log(formValue)
    console.log(this.newChat)
  }
}
