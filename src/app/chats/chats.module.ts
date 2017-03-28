import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ChatsComponent } from './chats.component';
import { ChatListComponent } from './chat-list';
import { ChatDetailComponent } from './chat-detail';
import { ChatNewComponent } from './chat-new';
import { ChatHolderComponent } from './chat-holder';
import { ChatsRoutingModule } from './chats-routing.module';
import { MessagesSharedModule } from '../messages';
import { ChatService, FilterChatByNamePipe } from './shared/';
import { ChatNavComponent } from './chat-nav/chat-nav.component';
import { UsersService } from '../auth/users';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { FilterUsersByName } from '../auth/users/';


@NgModule({
  declarations: [
    ChatsComponent,
    ChatListComponent,
    ChatDetailComponent,
    ChatNewComponent,
    ChatHolderComponent,
    ChatNavComponent,
    FilterChatByNamePipe,
    ChatInfoComponent,
    FilterUsersByName
  ],
  imports: [
    SharedModule,
    MessagesSharedModule,
    ChatsRoutingModule
  ],
  providers: [
    ChatService,
    UsersService
  ]
})

export class ChatsModule { }
