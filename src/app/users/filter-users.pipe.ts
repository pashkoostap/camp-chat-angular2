import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({
    name: 'filterUsersByName'
})

export class FilterUsersByName implements PipeTransform {
    public transform(users: User[], filterValue: string) {
        if (users) {
            return users.filter(user => {
                return user.username.match(new RegExp(filterValue, 'gi'));
            });
        } else {
            return users;
        }
    }
}