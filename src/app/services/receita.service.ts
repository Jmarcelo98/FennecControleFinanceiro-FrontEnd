import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/receita`

  valorReceita: number

  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  valorReceitaMesAtual() {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valorReceitaMes`, 
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

}