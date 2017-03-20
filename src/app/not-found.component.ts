import { Component } from '@angular/core';

@Component({
  selector: 'ct-not-found',
  template: '<h1>Page not found</h1>',
  styles: [`
    :host {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
    }
  `]
})

export class PageNotFoundComponent { }
