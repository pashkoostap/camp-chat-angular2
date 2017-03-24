import { NgModule } from '@angular/core';
import { SharedModule }  from '../shared';
import { MessagesSharedModule, SelectMessage } from './shared';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MessagesSharedModule,
    SelectMessage
  ],
  providers: []
})

export class MessagesModule {}
