import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/publica/cadastro/cadastro.component';
import { LoginComponent } from './pages/publica/login/login.component';
import { HomeComponent } from './pages/privata/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ServerOffComponent } from './component/server-off/server-off.component';
import { ListarReceitasComponent } from './pages/privata/listar-receitas/listar-receitas.component';
import { ToastrModule } from 'ngx-toastr';
import { AdicionarReceitaComponent } from './pages/privata/adicionar-receita/adicionar-receita.component';
import { AdicionarDespesaComponent } from './pages/privata/adicionar-despesa/adicionar-despesa.component';


export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    ServerOffComponent,
    ListarReceitasComponent,
    AdicionarReceitaComponent,
    AdicionarDespesaComponent,
  ],
  imports: [
    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,

    HttpClientModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
