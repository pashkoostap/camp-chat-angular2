import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { UsersService } from "../users.service";
import { User } from "../user.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  chatId: string;
  user: User;
  constructor(private usersService: UsersService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.chatId = params['id'];
      this.subscription = this.usersService.getAllUsers().subscribe(
        users => {
          this.user = users.filter(el => el.id === this.chatId)[0];
          console.log(this.user)
        },
        error => console.log(error)
      )
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
