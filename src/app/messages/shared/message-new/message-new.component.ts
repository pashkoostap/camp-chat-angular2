import { Component } from '@angular/core';

@Component({
  selector: 'ct-message-new',
  styleUrls: ['./message-new.component.scss'],
  templateUrl: './message-new.component.html'
})

export class MessageNewComponent {
  scrollTimeOut;
  constructor() { }

  onKeyPress(textArea: HTMLTextAreaElement) {
    clearTimeout(this.scrollTimeOut);
    this.scrollTimeOut = setTimeout(
      () => { 
        let maxHeight = 110;
        if (textArea.scrollHeight < 110) {
          textArea.setAttribute('style', `height: ${textArea.scrollHeight}px;`) 
        } else {
          textArea.setAttribute('style', `height: 110px;`) 
        }
      },
      100);
    ;
  }

}
