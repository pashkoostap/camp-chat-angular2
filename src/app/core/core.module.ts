import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { NavComponent } from './nav';
import { HeaderComponent } from './header'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    NavComponent
  ],
  declarations: [
    HeaderComponent,
    NavComponent
  ],
  providers: []
})

export class CoreModule { }
