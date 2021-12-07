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
import { ListarReceitasComponent } from './pages/privata/receitas/listar-receitas/listar-receitas.component';
import { ToastrModule } from 'ngx-toastr';
import { AdicionarReceitaComponent } from './pages/privata/receitas/adicionar-receita/adicionar-receita.component';
import { AdicionarDespesaComponent } from './pages/privata/despesas/adicionar-despesa/adicionar-despesa.component';
import { ListarDespesasComponent } from './pages/privata/despesas/listar-despesas/listar-despesas.component';
import { PainelComponent } from './pages/privata/home/painel/painel.component';
import { SelecioneUmAnoComponent } from './pages/privata/home/selecione-um-ano/selecione-um-ano.component';
import { EsqueceuSenhaComponent } from './pages/publica/esqueceu-senha/esqueceu-senha.component';
import { DigitarEmailComponent } from './pages/publica/esqueceu-senha/digitar-email/digitar-email.component';
import { DigitarCodigoComponent } from './pages/publica/esqueceu-senha/digitar-codigo/digitar-codigo.component';
import { NovaSenhaComponent } from './pages/publica/esqueceu-senha/nova-senha/nova-senha.component';
import { CarregandoRequisicaoComponent } from './component/carregando-requisicao/carregando-requisicao.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ReceitaComponent } from './pages/privata/receitas/receita.component';
import { DespesaComponent } from './pages/privata/despesas/despesa.component';


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
    ListarDespesasComponent,
    PainelComponent,
    SelecioneUmAnoComponent,
    EsqueceuSenhaComponent,
    DigitarEmailComponent,
    DigitarCodigoComponent,
    NovaSenhaComponent,
    CarregandoRequisicaoComponent,
    NavbarComponent,
    ReceitaComponent,
    DespesaComponent,
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
