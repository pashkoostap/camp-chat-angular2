import { Injectable } from '@angular/core';

Injectable();
export class AuthService {
    get IsLoggedIn() {
        return localStorage.getItem('token');
    }

    login(user) {
        if (user) {
            localStorage.setItem('token', 'youlogged');
        }
    }

    register() {

    }

    logout() {
        localStorage.setItem('token', null);
    }
}