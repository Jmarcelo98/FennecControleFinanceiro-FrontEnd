import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/AuthGuardService';
import { AdicionarReceitaComponent } from './pages/privata/adicionar-receita/adicionar-receita.component';
import { HomeComponent } from './pages/privata/home/home.component';
import { ListarReceitasComponent } from './pages/privata/listar-receitas/listar-receitas.component';
import { CadastroComponent } from './pages/publica/cadastro/cadastro.component';
import { LoginComponent } from './pages/publica/login/login.component';

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
    path: "nova-receita",
    canActivate: [AuthGuardService],
    component: AdicionarReceitaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
