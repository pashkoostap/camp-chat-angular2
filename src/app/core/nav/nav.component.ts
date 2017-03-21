import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() { }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['auth/login'])
  }
}
