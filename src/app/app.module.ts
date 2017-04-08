import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './not-found.component';
import { AuthService, AuthGuard, GoogleAuthService } from './auth/';
import { UsersModule } from './users/';
import { FacebookModule, FacebookService } from 'ng2-facebook-sdk';


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
    FacebookModule
  ],
  providers: [AuthGuard, AuthService, GoogleAuthService, FacebookService],
  bootstrap: [AppComponent]
})

export class AppModule { }
