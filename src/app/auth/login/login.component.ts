import { Component, OnDestroy } from '@angular/core';
import { User } from './login.interface';
import { AppAuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketChatService } from "../../shared";

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnDestroy {
  public loginErrorHint: string = '';
  private subscriptions: Subscription[] = [];
  private socket: any;
  constructor(private auth: AppAuthService,
    private router: Router,
    private socketChatService: SocketChatService) { }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }

  onSumbit(formValue) {
    this.subscriptions.push(this.auth.login(formValue).subscribe(this.onLoginSuccess.bind(this), this.onError.bind(this)));
  }

  private onLoginSuccess(response: any): void {
    this.socket = this.socketChatService.initSocket(response.token, () => {
      this.auth.setUserState(response);
      this.router.navigate(['home']);
    });
  }

  private onError(err) {
    this.loginErrorHint = err.json().message;
  }
}
