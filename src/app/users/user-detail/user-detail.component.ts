import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { UsersService } from "../users.service";
import { User } from "../user.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  selectedUserID: string;
  user: User;
  userPhoto: any;
  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private satinizer: DomSanitizer) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.selectedUserID = params['id'];
      this.subscription = this.usersService.getAllUsers().subscribe(
        users => {
          this.user = users.filter(user => {
            if (user._id === this.selectedUserID) {
              // this.userPhoto = this.satinizer.bypassSecurityTrustStyle(`url(${user.photo})`);
              return user;
            }
          })[0];
        },
        error => console.log(error)
      )
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
