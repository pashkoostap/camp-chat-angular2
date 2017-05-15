import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '../auth.service';
import { AuthService } from "angular2-social-login";
import { SocketChatService } from "../../shared";

@Component({
  selector: 'app-alt-login',
  templateUrl: './alt-login.component.html',
  styleUrls: ['./alt-login.component.scss']
})

export class AltLoginComponent {
  sub: any;
  private socket: any;
  constructor(private router: Router,
    private authService: AppAuthService,
    private authSocial: AuthService,
    private socketChatService: SocketChatService) { }

  onSignIn(provider: string) {
    this.sub = this.authSocial.login(provider).subscribe(
      (data: any) => {
        let userObj = {
          username: data.name,
          email: data.email,
          provider: data.provider,
          photo: data.image,
          uid: data.uid
        }
        this.authService.loginWithProviders(userObj, (user, err) => {
          if (user) {
            console.log(user)
            this.socket = this.socketChatService.initSocket(user.token, () => {
              this.authService.setUserState(user);
              this.router.navigate(['chat']);
            });
          } else {
            console.log(err)
          }
        })
      }
    )
  }
}
