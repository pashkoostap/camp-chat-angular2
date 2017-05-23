import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppAuthService } from "../auth.service";
import { Http } from "@angular/http";
import { API_CONFIG } from '../../shared/';

@Component({
  selector: 'ct-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public isPhotoLoading: boolean = false;
  public photoLoadingHint: string = 'Photo is uploading now';
  public labelFileInputValue: string = 'Upload photo';
  private photoURL: string = '';
  public registerErrorHint: string = '';
  constructor(private auth: AppAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: Http) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      username: ['',
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
            Validators.minLength(6),
            Validators.pattern("[a-zA-Z0-9]*")
          ]
        ],
        passwordConfirmed: ['',
          [
            Validators.required,
            Validators.minLength(6),
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
  onFileUpload(event, input) {
    let file = input.files[0];
    if (file.type.match('image/*')) {
      this.isPhotoLoading = true;
      this.photoLoadingHint = 'Photo is uploading now';
      let reader = new FileReader();
      this.labelFileInputValue = file.name;
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.http.post(API_CONFIG.UPLOAD_IMAGE, { image: reader.result }).subscribe(res => {
          let resObj = res.json();
          this.photoLoadingHint = 'Photo was successfully uploaded';
          this.photoURL = resObj.secure_url;
        })
      };
    } else {
      this.isPhotoLoading = true;
      this.photoLoadingHint = 'Photo must be an image';
    }
  }

  onSubmit(user: FormGroup) {
    let userData = {
      username: user.controls['username'].value,
      email: user.controls['email'].value,
      password: user.controls['passwords']['controls']['password'].value,
      photo: this.photoURL
    };
    this.auth.register(userData, (user, err) => {
      if (user) {
        this.router.navigate(['auth/login']);
      } else {
        this.registerErrorHint = err.message;
      }
    })
  }
}