import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'

import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmacaoDialogComponent } from './component/confirmacao-dialog/confirmacao-dialog.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

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
    ConfirmacaoDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
