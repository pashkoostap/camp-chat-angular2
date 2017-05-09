import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { Subscription } from 'rxjs';
import { User, UsersService } from '../../users/';
import { Chat, ChatService } from '../shared/';
import { AppAuthService } from "../../auth";
import { API_CONFIG } from '../../shared/';

@Component({
  selector: 'ct-chat-new',
  styleUrls: ['./chat-new.component.scss'],
  templateUrl: './chat-new.component.html'
})

export class ChatNewComponent implements OnInit, OnDestroy {
  public users: User[];
  public isUserChecked: boolean = false;
  private subscriptions: Subscription[] = [];
  public searchValue: string = '';
  private searchMatches: number = 0;
  private isSearchFieldActive: boolean = false;
  private newChatElement: any;
  public isErrorMessage: string = '';
  public hideError: boolean = false;
  public isPhotoLoading: boolean = false;
  public photoLoadingHint: string = 'Photo is uploading now';
  public labelFileInputValut: string = 'Upload photo';
  private photoURL: string = '';
  private newChat: Chat = {
    chatname: '',
    users: [],
    photo: ''
  };
  constructor(private usersService: UsersService,
    private auth: AppAuthService,
    private router: Router,
    public element: ElementRef,
    private chatService: ChatService,
    private satinizer: DomSanitizer,
    private http: Http) { }

  ngOnInit() {
    this.subscriptions.push(
      this.usersService.getAllUsers().subscribe(
        users => this.users = users.filter(user => {
          user.photo = this.satinizer.bypassSecurityTrustStyle(`url(${user.photo})`);
          return user.username !== this.auth.getUserInfo().user.username;
        }),
        error => console.log(error)
      ),
      this.usersService.getSearchValue().subscribe(value => this.searchValue = value)
    )
    this.newChatElement = this.element.nativeElement;
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  onAddUser(selectedEl: HTMLLIElement, user: User, i: number) {
    selectedEl.classList.toggle('selected');
    let userObj: any = { username: this.users[i].username };
    if (selectedEl.classList.contains('selected')) {
      this.newChat.users.push(userObj);
    } else {
      this.newChat.users.splice(userObj, 1);
    }
    this.isUserChecked = this.newChat.users.length > 0;
  }

  onSearchValueChanged(value: string = '', el: HTMLUListElement) {
    this.usersService.setSearchValue(value);
    setTimeout(() => {
      if (!value) {
        this.isSearchFieldActive = true;
      } else {
        this.isSearchFieldActive = false;
      }
      this.searchMatches = el.querySelectorAll('li').length;
    }, 100)
  }

  onSearchFieldClear(input: HTMLInputElement, usersList: HTMLUListElement) {
    this.cleareSearchResults(usersList);
    input.value = '';
  }

  onFileUpload(event, input) {
    let file = input.files[0];
    if (file.type.match('image/*')) {
      this.isPhotoLoading = true;
      this.photoLoadingHint = 'Photo is uploading now';
      let reader = new FileReader();
      this.labelFileInputValut = file.name;
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

  onSubmit(event, form, usersList: HTMLUListElement) {
    event.preventDefault();
    this.newChat.chatname = form.controls['chatname'].value;
    this.newChat.photo = this.photoURL;
    this.cleareSearchResults(usersList);
    this.newChatElement.querySelector('.new-chat-form__input').value = '';
    this.newChat.users.push({ username: this.auth.getUserInfo().user.username });
    this.chatService.createNewChat(this.newChat, (chat, err) => {
      if (err) {
        console.log(err.json());
        this.isErrorMessage = err.json().message;
        this.hideError = false;
      } else {
        this.router.navigate(['chat', chat._id])
      }
    });
    this.newChat.users.splice(0);
  }

  cleareSearchResults(list: HTMLUListElement) {
    this.searchValue = '';
    this.usersService.setSearchValue('');
    this.isSearchFieldActive = false;
    Array.prototype.forEach.call(list.querySelectorAll('li'),
      (el) => { return el.classList.remove('selected') }
    );
    list.scrollTop = 0;
  }
}
