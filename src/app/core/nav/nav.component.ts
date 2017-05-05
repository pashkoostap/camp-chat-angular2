import { Component, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppAuthService } from '../../auth';
import { Router } from '@angular/router';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements DoCheck {
  private userName: string = '';
  private userPhoto: any;
  constructor(public authService: AppAuthService,
    private router: Router,
    private authSocial: AuthService,
    private satinizer: DomSanitizer) { }

  ngDoCheck() {
    if (this.authService.isLoggedIn && !this.userName) {
      this.userName = this.authService.getUserInfo().user.username;
      this.userPhoto = this.satinizer.bypassSecurityTrustStyle(`url(${this.authService.getUserInfo().user.photo})`);
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
    window.location.reload();
  }
}
