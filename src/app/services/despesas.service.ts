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

  atualizarDespesa(despesa: Despesa) {
    return this.httpClient.put(`${this.CAMINHO_API}`, despesa,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  excluir(id: number) {
    return this.httpClient.delete<string>(`${this.CAMINHO_API}/${id}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  valorDespesaMesAnoPesquisado(ano: number, mes: number){
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valorDespesaMes/${ano}/${mes}`,
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  valorDespesaMesAtual() {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valorDespesaMes`, 
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  valorDespesaData(data: string) {
    if (data == null) {
      return null;
    } else {
      return this.httpClient.get<Despesa[]>(`${this.CAMINHO_API}/${data.substring(0, 4)}/${data.substring(5, 7)}`,
        { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
    }

  }

}
