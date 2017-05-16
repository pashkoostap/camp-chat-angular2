import { Component, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppAuthService } from '../../auth';
import { Router } from '@angular/router';
import { AuthService } from "angular2-social-login";
import { User } from "../../users";
import { SocketChatService } from "../../shared";

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements DoCheck {
  private user: User = {
    username: '',
    _id: '',
    photo: ''
  }
  constructor(public authService: AppAuthService,
    private router: Router,
    private authSocial: AuthService,
    private satinizer: DomSanitizer,
    private socketService: SocketChatService) { }

  ngDoCheck() {
    if (this.authService.isLoggedIn && !this.user.username) {
      this.user = this.authService.getUserInfo().user;
      this.user.photo = this.satinizer.bypassSecurityTrustStyle(`url(${this.user.photo})`);
    }
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
    this.socketService.disconnect();
  }

  navigateToUserProfile() {
    if (this.user._id.length > 0) {
      this.router.navigate(['users', this.user._id])
    }
  }
}
