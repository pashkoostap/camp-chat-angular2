import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FacebookService, LoginOptions, LoginResponse } from "ng2-facebook-sdk";
declare let gapi: any;

@Component({
  selector: 'app-alt-login',
  templateUrl: './alt-login.component.html',
  styleUrls: ['./alt-login.component.scss']
})

export class AltLoginComponent implements OnInit {
  profile;
  googleRequest;
  constructor(private router: Router,
    private authService: AuthService,
    private fbService: FacebookService) { }

  ngOnInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '389791797128-nemtk3jqd1m4chgld3ihqsdvl4rho6rc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      }).then((auth2) => {
        auth2.attachClickHandler(
          document.getElementById('google-auth-btn'), {},
          this.onGoogleLoginErrorSuccess.bind(this),
          this.onGoogleLoginError
        );
      })
    });

    this.fbService.init({
      appId: '220680781748062',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    })
  }

  onGoogleLoginErrorSuccess(user): void {
      console.log(user.getBasicProfile());
      this.authService.setUserState({username: user.getBasicProfile().ig})
      this.router.navigate(['chat']);
  }

  onGoogleLoginError(err) { console.log(err) }

  onFBLogin() {
    const options: LoginOptions = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fbService.login()
      .then((res: LoginResponse) => {
        let promise = this.fbService.api(`/${res.authResponse.userID}`);
        promise.then((res) => {
          console.log(res)
          this.authService.setUserState({ username: res.name });
          this.router.navigate(['chat']);
        })
      })
      .catch(e => console.error('Error logging in'));
  }
}
