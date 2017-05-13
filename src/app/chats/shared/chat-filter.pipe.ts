import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from './chat.model';

@Pipe({
  name: 'filterChatByName'
})

export class FilterChatByNamePipe implements PipeTransform {
  public transform(chats: Chat[], filterValue: string) {
    if (chats) {
      return chats.filter(chat => {
        return chat.chatname.match(new RegExp(filterValue, 'gi'));
      });
    } else {
      return chats;
    }
  }

}