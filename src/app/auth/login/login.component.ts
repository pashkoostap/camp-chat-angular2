import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './login.interface';
import { AppAuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../users';
import { SocketChatService } from "../../shared";

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private auth: AppAuthService,
    private router: Router,
    private socketChatService: SocketChatService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }

  private onSumbit(formValue: User) {
    this.subscriptions.push(this.auth.login(formValue).subscribe(this.onLoginSuccess.bind(this), this.onError));
  }

  private onLoginSuccess(response: any): void {
    console.log(response);
    this.auth.setUserState(response);
    this.socketChatService.initSocketAfterLogin(response.token);
    console.log(this.socketChatService.getSocketState())
    this.router.navigate(['chat']);
  }

  private onError(err) {
    console.log('User not found');
  }
}
