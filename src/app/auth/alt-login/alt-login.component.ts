import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GoogleAuthService } from "../google-auth.service";
import { FacebookService, LoginOptions, LoginResponse } from "ng2-facebook-sdk";
declare let gapi: any;

@Component({
  selector: 'app-alt-login',
  templateUrl: './alt-login.component.html',
  styleUrls: ['./alt-login.component.scss']
})

export class AltLoginComponent implements OnInit {
  profile;
  constructor(private router: Router,
    private authService: AuthService,
    private googleService: GoogleAuthService,
    private fbService: FacebookService) { }

  ngOnInit() {
    this.googleService.sendRequest('google-auth-btn');
    this.fbService.init({
      appId: '220680781748062',
      xfbml: true,
      version: 'v2.8'
    })
  }
  onSignIn(event) {
  }

  onFBLogin() {
    const options: LoginOptions = {
      scope: 'public_profiel,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fbService.login()
      .then((response: LoginResponse) => console.log('Logged in', response))
      .catch(e => console.error('Error logging in'));
  }
}
