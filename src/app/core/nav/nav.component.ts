import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import { UsersService } from '../../auth/users/'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  private userName: string = '';
  private subscription: Subscription;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.getUserState().subscribe(state => this.userName = state.username)
    // if (this.authService.isLoggedIn) {
      this.userName = JSON.parse(localStorage.getItem('token')).username;
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['auth/login'])
  }
}
