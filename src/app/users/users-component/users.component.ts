import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from "../users.service";
import { Subscription } from 'rxjs';
import { User } from "../user.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users;
  subscription: Subscription;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.subscription = this.usersService.getAllUsers().subscribe(
      users => this.users = users, error => console.log(error)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
