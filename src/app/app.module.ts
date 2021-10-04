import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/publica/cadastro/cadastro.component';
import { LoginComponent } from './pages/publica/login/login.component';
import { HomeComponent } from './pages/privata/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
