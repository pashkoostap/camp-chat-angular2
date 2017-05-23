import { Component } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'ct-home',
  template: `
  <div class='intro-wrap'>
    <div class='intro-wrap__photo'></div>
    <img src="assets/img/intro-video-new.gif" class='intro-wrap__video' alt="" />
  </div>
        `,
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
