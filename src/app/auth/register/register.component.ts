import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
      name: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern("[a-zA-Z0-9]*")
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]
      ],
      passwords: this.formBuilder.group({
        password: ['',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("[a-zA-Z0-9]*")
          ]
        ],
        passwordConfirmed: ['',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("[a-zA-Z0-9]*")
          ]
        ]
      }, {
          validator: this.checkPasswords
        })

    })
  }

  checkPasswords(passwords: FormGroup) {
    let passwordValue = passwords.get('password').value;
    let passwordConfirmedValue = passwords.get('passwordConfirmed').value;

    if (passwordValue.length > 0 && passwordConfirmedValue.length > 0 && (passwordValue === passwordConfirmedValue)) {
      return null
    }
    return {
      valid: false
    }
  }

  onSubmit(user: FormGroup) {
    console.log(user);
  }
}

function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey];
    let passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({ notEquivalent: true })
    }
  }
}
