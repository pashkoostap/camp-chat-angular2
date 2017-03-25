import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { MessageListComponent } from './message-list';
import { MessageNewComponent } from './message-new';
import { MessageService } from './message.service';
import { SelectMessage } from './select-message.directive';
import { FilterMessageByName } from './filter-messages.pipe';

@NgModule({
  declarations: [
    MessageListComponent,
    MessageNewComponent,
    SelectMessage,
    FilterMessageByName
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
