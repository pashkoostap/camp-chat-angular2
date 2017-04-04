import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UsersService } from "./users.service";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users-component/";
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent],
  imports: [
    CommonModule, 
    UsersRoutingModule],
  providers: [UsersService]
})

export class UsersModule { }
