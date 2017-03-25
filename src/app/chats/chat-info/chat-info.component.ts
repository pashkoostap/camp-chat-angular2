import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ct-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {
  attendees: number[] = [1,2,3,4];
  constructor() { }

  ngOnInit() { }

  onAttendessShow(el: HTMLUListElement) {
    el.classList.add('selected')
  }

  onAttendessHide(el: HTMLUListElement) {
    el.classList.remove('selected')
  }

}
