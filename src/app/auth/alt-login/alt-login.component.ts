import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare let gapi: any;
declare let FB: any;

@Component({
  selector: 'app-alt-login',
  templateUrl: './alt-login.component.html',
  styleUrls: ['./alt-login.component.scss']
})

export class AltLoginComponent implements OnInit {
  profile;
  googleRequest;
  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    gapi.load('auth2', () => {
      this.googleRequest = gapi.auth2.init({
        client_id: '389791797128-nemtk3jqd1m4chgld3ihqsdvl4rho6rc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
    });

    FB.init({
      appId: '220680781748062',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    })
  }

  onGoogleBtnClick(e) {
    this.googleRequest.then((auth2) => {
      auth2.signIn().then((res) => {
        console.log(res.getBasicProfile())
        this.authService.setUserState({ username: res.getBasicProfile().ig })
        this.router.navigate(['chat']);
      })
    })
  }

  onFBLogin() {
    const options = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    FB.login((res) => {
      if (res.authResponse) {
        FB.api(`/${res.authResponse.userID}`, (res) => {
          console.log(res)
          this.authService.setUserState({ username: res.name });
          this.router.navigate(['chat']);
        });
      }
    })
  }
}
