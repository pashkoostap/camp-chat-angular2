/// <reference path="../../../../node_modules/@types/gapi/index.d.ts" />
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare let gapi: any;

@Component({
  selector: 'app-alt-login',
  templateUrl: './alt-login.component.html',
  styleUrls: ['./alt-login.component.scss']
})
export class AltLoginComponent implements OnInit {
  profile;
  constructor(private zone: NgZone,
              private router: Router,
              private authService: AuthService) { }



  ngOnInit() {
    gapi.load('auth2', () => {
      let auth2 = gapi.auth2.init({
        client_id: '389791797128-nemtk3jqd1m4chgld3ihqsdvl4rho6rc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
      auth2.attachClickHandler(
        document.getElementById('google-auth-btn'), {},
        this.onSuccess.bind(this),
        this.onFailure
      );
    });
  }

  onFailure() {

  }

  onSuccess(user): void {
    this.zone.run(() => {
      this.profile = user.getBasicProfile();
      console.log(this.profile);
      this.authService.login(this.profile)
      this.router.navigate(['chat']);
    });
  }

  onClick() {

  }
}
