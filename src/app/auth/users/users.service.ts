import { Injectable } from '@angular/core';
import { USERS } from './mock-users';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
    getAllUsers(): Observable<User[]> {
        return Observable.create(observer => observer.next(USERS));
    }
}