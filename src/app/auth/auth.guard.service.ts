import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AppAuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AppAuthService,
        private router: Router) { }

    canActivate() {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}