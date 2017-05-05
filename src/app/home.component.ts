import { Component } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'ct-home',
  template: `<h1>Welcome to Chat Application</h1>`,
  styles: [`
    :host {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
    }
    h1 {
      text-align: center;
    }
  `]
})

export class HomeComponent { }
