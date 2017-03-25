import { NgModule } from '@angular/core';
import { SharedModule }  from '../shared';
import { MessagesSharedModule } from './shared';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MessagesSharedModule
  ],
  providers: []
})

export class MessagesModule {}
