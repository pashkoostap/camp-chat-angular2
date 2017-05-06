import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from "../users.service";
import { Subscription } from 'rxjs';
import { User } from "../user.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  selectedId: string;
  constructor(private usersService: UsersService,
    private router: Router,
    private satinizer: DomSanitizer) { }

  ngOnInit() {
    this.subscription = this.usersService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.users.forEach(user => {
          user.photo = this.satinizer.bypassSecurityTrustStyle(`url(${user.photo})`);
        })
      }, error => console.log(error)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  select(user) {
    this.selectedId = user.id;
    this.router.navigate(['users', user.id])
  }
}
