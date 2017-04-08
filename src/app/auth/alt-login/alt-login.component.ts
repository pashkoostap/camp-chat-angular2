import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GoogleAuthService } from "../google-auth.service";
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
    private googleService: GoogleAuthService) { }

  ngOnInit() {
    this.googleService.sendRequest('google-auth-btn');
  }
  onSignIn(event) {
  }
}
