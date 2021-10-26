import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Despesa } from '../models/despesa';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/despesa`

  valorDespesa: number;

  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  adicionarNovaReceita(despesa: Despesa) {
    return this.httpClient.post(`${this.CAMINHO_API}`, despesa,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  valorDespesaMesAtual() {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valorDespesaMes`, 
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

}
