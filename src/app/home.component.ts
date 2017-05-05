import { Component } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'ct-home',
  template: `<h1>Welcome to Chat Application</h1>
    <form>
      <input type="file" #input/>
      <button type="submit" (click)="onSubmit($event, input)">Send file</button>
    </form>
  
  
  
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

export class HomeComponent {
  constructor(private http: Http) { }
  onSubmit(e, input) {
    e.preventDefault();
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
      this.http.post('https://pashkoostap-camp-chat-server.herokuapp.com/image', { image: reader.result }).subscribe(res => console.log(res.json()))
    };
  }
}
