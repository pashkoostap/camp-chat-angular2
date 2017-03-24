import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { MessageListComponent } from './message-list';
import { MessageNewComponent } from './message-new';
import { MessageService } from './message.service';
import { SelectMessage } from './select-message.directive';

@NgModule({
  declarations: [
    MessageListComponent,
    MessageNewComponent,
    SelectMessage
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MessageListComponent,
    MessageNewComponent
  ],
  providers: [MessageService]
})

export class MessagesSharedModule { }
