import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import { UsersService } from '../../auth/users/'
import { Router } from '@angular/router';

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  private userName: string = 'dasd';
  constructor(private authService: AuthService,
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUserState().subscribe(state => this.userName = state.username)
   }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['auth/login'])
  }
}
