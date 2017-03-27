import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './login.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../users';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  user: User = {
    email: '',
    password: ''
  }
  constructor(private auth: AuthService,
              private router: Router,
              private userService: UsersService) {}

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }
  private onSumbit(form: User) {
    // console.log(form)
    this.auth.login({
      pass: form.password,
      username: form.email
    }).subscribe(this.onLoginSuccess.bind(this), this.onError);
  }

  private onLoginSuccess(res: any):void {
    console.log(res);
    this.userService.setUserState(res);
    localStorage.setItem('token', 'youlogged');
    this.router.navigate(['chat']);
  }

  private onError(err) {
    console.log(err);
    console.log('login error');
  }
}
