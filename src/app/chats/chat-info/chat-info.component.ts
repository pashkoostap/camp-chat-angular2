import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../messages/shared/';

@Component({
  selector: 'ct-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {
  private attendees: number[] = [1, 2, 3, 4];
  private chatName: string = 'Some chat name';
  private maxWidthValue: number = 0;
  private searchValue: string = '';
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.maxWidthValue = this.setAttendessWrapWidth(50, 30);
  }

  setAttendessWrapWidth(elWidth: number, elOffset?: number) {
    if (!elOffset) {
      return this.attendees.length * elWidth;
    } else {
      return this.attendees.length * elWidth - (this.attendees.length - 1) * elOffset;
    }
  }

  onAttendessShow(el: HTMLUListElement) {
    this.maxWidthValue = this.setAttendessWrapWidth(50);
    el.classList.add('selected')
  }

  onAttendessHide(el: HTMLUListElement) {
    this.maxWidthValue = this.setAttendessWrapWidth(50, 30);
    el.classList.remove('selected')
  }

  onSearchFieldOpen(el: HTMLDivElement) {
    el.classList.toggle('visible');
  }

  onBlur() {
    setTimeout(() => {
      this.searchValue = '';
      this.messageService.setSearchValue('');
    }, 300)
  }

  onSearchValueChanged(value: string) {
    this.messageService.setSearchValue(value)
  }
}
