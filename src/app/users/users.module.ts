import { NgModule } from '@angular/core';
import { UsersComponent } from "./users-component/";
import { UsersService } from "./users.service";
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  imports: [],
  providers: [UsersService]
})

export class UsersModule { }
