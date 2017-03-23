import { Injectable } from '@angular/core';
import { USERS } from './mock-users';

@Injectable()
export class UsersService {
    getUsers() {
        return Promise.resolve(USERS);
    }
}