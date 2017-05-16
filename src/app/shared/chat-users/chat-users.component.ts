import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { User } from "../../users";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements DoCheck{
  constructor(private router: Router) { }
  @Input() users: User[];
  @Input() connectedUsers: User[];
  @Output() isChatUsersVisibleEvent: EventEmitter<boolean> = new EventEmitter();
  ngDoCheck() {
    // console.log(this.connectedUsers)
  }
  isUserConnected(user) {
    return this.connectedUsers.filter(connectedUser => connectedUser.username == user.username).length > 0;
  }
  closeChatUsers() {
    this.isChatUsersVisibleEvent.emit(false);
  }
  navigateToUserProfile(user) {
    this.router.navigate(['users', user._id]);
  }
}
