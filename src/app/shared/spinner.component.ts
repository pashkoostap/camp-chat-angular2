import { Component, Input } from '@angular/core';

@Component({
  selector: 'ct-spinner',
  template: '<h2>{{text}}<span></span></h2>',
  styles: [``]
})

export class SpinnerComponent {
  @Input() text: string;
 }
