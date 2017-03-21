import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ct-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  user: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
        passwords: this.formBuilder.group({
          password: ['', [Validators.required]],
          passwordConfirmed: ['', [Validators.required]]
        })
    })
  }

  onSubmit(user: FormGroup) {
    console.log(user)
  }

}
