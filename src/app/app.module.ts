import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './not-found.component';
import { AuthService, AuthGuard } from './auth/';
import { UsersModule } from './users/';
import { Angular2SocialLoginModule } from "angular2-social-login";

const providers = {
  "google": {
    "clientId": "389791797128-nemtk3jqd1m4chgld3ihqsdvl4rho6rc.apps.googleusercontent.com"
  },
  "linkedin": {
    "clientId": "86j0gw4674pll9"
  },
  "facebook": {
    "clientId": "220680781748062",
    "apiVersion": "v2.8" //like v2.4 
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    UsersModule,
    Angular2SocialLoginModule.initWithProviders(providers)
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
