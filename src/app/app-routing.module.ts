import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/AuthGuardService';
import { CodigoGuardService } from './guards/CodigoGuardService';
import { EmailGuardService } from './guards/EmailGuardService';
import { AdicionarDespesaComponent } from './pages/privata/despesas/adicionar-despesa/adicionar-despesa.component';
import { AdicionarReceitaComponent } from './pages/privata/receitas/adicionar-receita/adicionar-receita.component';
import { HomeComponent } from './pages/privata/home/home.component';
import { ListarDespesasComponent } from './pages/privata/despesas/listar-despesas/listar-despesas.component';
import { ListarReceitasComponent } from './pages/privata/receitas/adicionar-receita/listar-receitas/listar-receitas.component';
import { CadastroComponent } from './pages/publica/cadastro/cadastro.component';
import { DigitarCodigoComponent } from './pages/publica/esqueceu-senha/digitar-codigo/digitar-codigo.component';
import { EsqueceuSenhaComponent } from './pages/publica/esqueceu-senha/esqueceu-senha.component';
import { NovaSenhaComponent } from './pages/publica/esqueceu-senha/nova-senha/nova-senha.component';
import { LoginComponent } from './pages/publica/login/login.component';
import { ReceitaComponent } from './pages/privata/receitas/receita.component';
import { DespesaComponent } from './pages/privata/despesas/despesa.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cadastro",
    component: CadastroComponent
  },
  {
    path: "receitas",
    canActivate: [AuthGuardService],
    component: ListarReceitasComponent
  },
  {
    path: "despesas",
    canActivate: [AuthGuardService],
    component: ListarDespesasComponent
  },
  {
    path: "nova-receita",
    canActivate: [AuthGuardService],
    component: ReceitaComponent
  },
  {
    path: "nova-despesa",
    canActivate: [AuthGuardService],
    component: DespesaComponent
  },
  {
    path: "digitar-email",
    component: EsqueceuSenhaComponent
  },
  {
    path: "digitar-codigo",
    component: DigitarCodigoComponent,
    canActivate: [EmailGuardService]
  },
  {
    path: 'nova-senha',
    component: NovaSenhaComponent,
    canActivate: [CodigoGuardService]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
