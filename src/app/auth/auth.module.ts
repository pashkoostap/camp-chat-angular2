import { NgModule } from '@angular/core';
import { SharedModule }  from '../shared';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthRoutingModule} from './auth-routing.module';
import { AltLoginComponent } from './alt-login/alt-login.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AltLoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: []
})

export class AuthModule {}
