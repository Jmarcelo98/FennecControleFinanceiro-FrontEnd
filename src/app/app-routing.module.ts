import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/AuthGuardService';
import { CodigoGuardService } from './guards/CodigoGuardService';
import { EmailGuardService } from './guards/EmailGuardService';
import { AdicionarDespesaComponent } from './pages/private/despesas/adicionar-despesa/adicionar-despesa.component';
import { AdicionarReceitaComponent } from './pages/private/receitas/adicionar-receita/adicionar-receita.component';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarDespesasComponent } from './pages/private/despesas/listar-despesas/listar-despesas.component';
import { ListarReceitasComponent } from './pages/private/receitas/listar-receitas/listar-receitas.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { DigitarCodigoComponent } from './pages/public/esqueceu-senha/digitar-codigo/digitar-codigo.component';
import { EsqueceuSenhaComponent } from './pages/public/esqueceu-senha/esqueceu-senha.component';
import { NovaSenhaComponent } from './pages/public/esqueceu-senha/nova-senha/nova-senha.component';
import { LoginComponent } from './pages/public/login/login.component';
import { ReceitaComponent } from './pages/private/receitas/receita.component';
import { DespesaComponent } from './pages/private/despesas/despesa.component';

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
