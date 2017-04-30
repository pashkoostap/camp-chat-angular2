import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '../auth.service';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'app-alt-login',
  templateUrl: './alt-login.component.html',
  styleUrls: ['./alt-login.component.scss']
})

export class AltLoginComponent {
  sub: any;
  constructor(private router: Router,
    private authService: AppAuthService,
    private authSocial: AuthService) { }

  onSignIn(provider: string) {
    this.sub = this.authSocial.login(provider).subscribe(
      (data) => {
        this.authService.setUserState({user: { username: data['name'], provider: provider }});
        this.router.navigate(['chat']);
      }
    )
  }
}
