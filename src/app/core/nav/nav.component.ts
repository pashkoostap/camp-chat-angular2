import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../auth';
import { UsersService } from '../../users/';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  private userName: string = '';
  private subscription: Subscription;
  constructor(private authService: AppAuthService,
    private router: Router,
    private authSocial: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.getUserState().subscribe(state => this.userName = state.username)
    if (this.authService.isLoggedIn) {
      this.userName = this.authService.getUserInfo().username;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogOut() {
    if (this.authService.getUserInfo().hasOwnProperty('provider')) {
      this.authSocial.logout().subscribe(
        (data) => {
          this.authService.logout();
          this.router.navigate(['auth/login'])
        }
      )
    } else {
      this.authService.logout();
      this.router.navigate(['auth/login'])
    }

  }
}
