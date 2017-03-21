import { Component, OnInit } from '@angular/core';
import { User } from './login.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  }
  constructor(private auth: AuthService) {}

  ngOnInit() {

  }
  onSumbit(form) {
    console.log(form)
    // localStorage.setItem('token', 'youlogged');
    this.auth.login(form);
  }
}
