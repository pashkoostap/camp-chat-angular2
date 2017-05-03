import { Component, Input } from '@angular/core';

@Component({
  selector: 'ct-spinner',
  template: '<span class="text">{{text}}</span><div class="spinner"></div>',
  styles: [``]
})

export class SpinnerComponent {
  @Input() text: string;
 }
