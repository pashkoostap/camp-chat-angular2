import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Chat } from '../shared';

@Component({
  selector: 'ct-chat-list',
  styleUrls: ['./chat-list.component.scss'],
  templateUrl: './chat-list.component.html'
})

export class ChatListComponent implements OnInit {
  @Input() chats: Promise<Chat[]>;

  selectedId: number;

  constructor(private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

  }

  select(chat) {
    this.selectedId = chat.id;

    // Navigate with relative link
    this.router.navigate(['chat', chat.id])
  }

}
