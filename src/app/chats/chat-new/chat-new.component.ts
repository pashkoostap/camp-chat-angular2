import { Component, Input, OnInit } from '@angular/core';
import { User, UsersService } from '../../auth/users/'

@Component({
  selector: 'ct-chat-new',
  styleUrls: ['./chat-new.component.scss'],
  templateUrl: './chat-new.component.html'
})

export class ChatNewComponent implements OnInit {
  users: Promise<User[]>;
  isUsersWrapVisible: boolean = true;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();
  }

  onOnenUsersWrap() {
    this.isUsersWrapVisible = !this.isUsersWrapVisible;
  }

  onSubmit(form) {
    console.log(form)
  }

}
