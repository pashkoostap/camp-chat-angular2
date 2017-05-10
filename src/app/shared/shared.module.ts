import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTextComponent } from './filter-text.component';
import { SpinnerComponent } from './spinner.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    ChatUsersComponent
  ],
  declarations: [
    FilterTextComponent,
    SpinnerComponent,
    ChatUsersComponent
  ],
  providers: []
})

export class SharedModule { }
