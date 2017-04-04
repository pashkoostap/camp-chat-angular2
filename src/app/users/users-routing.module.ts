import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users-component/';
import { UserDetailComponent } from './user-detail/';

const authRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: ':id',
        component: UserDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class UsersRoutingModule { }
