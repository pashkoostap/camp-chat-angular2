import { Injectable } from '@angular/core';

Injectable();
export class AuthService {
    get isLoggedIn() {
        return localStorage.getItem('token') == '' ? false : true;
    }

    login(user) {
        if (user) {
            localStorage.setItem('token', 'youlogged');
        }
    }

    register() {

    }

    logout() {
        localStorage.setItem('token', '');
    }
}