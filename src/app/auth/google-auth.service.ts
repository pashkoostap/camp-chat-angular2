import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
declare let gapi: any;

@Injectable()
export class GoogleAuthService {
  constructor(private http: Http,
    private zone: NgZone) { }

  sendRequest(selector: string) {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '389791797128-nemtk3jqd1m4chgld3ihqsdvl4rho6rc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      }).then((auth2) => {
        auth2.attachClickHandler(
          document.getElementById(selector), {},
          this.onSuccess.bind(this),
          this.onFailure
        );
      })

    });
  }

  onFailure(err) { console.log(err) }

  onSuccess(user): void {
    this.zone.run(() => {
      console.log(user.getBasicProfile());
      // console.log(this.profile);
      // this.authService.login(this.profile)
      // this.router.navigate(['chat']);
    });
  }
}
