import { Component, OnInit } from '@angular/core';
import { User } from './login.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {

  }
  onSumbit(form) {
    console.log(form)
    this.auth.login(form);
    this.router.navigate(['chat'])
  }
}
