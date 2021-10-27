import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Receita } from '../models/receita';
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

  valorReceitaMesAnoPesquisado(ano: number, mes: number){
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valorReceitaMes/${ano}/${mes}`,
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  excluir(id: number) {
    return this.httpClient.delete<string>(`${this.CAMINHO_API}/${id}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  atualizarReceita(receita: Receita) {
    return this.httpClient.put(`${this.CAMINHO_API}`, receita,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  adicionarNovaReceita(receita: Receita) {
    return this.httpClient.post(`${this.CAMINHO_API}`, receita,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  valorReceitaData(data: string) {

    if (data == null) {
      return null;
    } else {
      return this.httpClient.get<Receita[]>(`${this.CAMINHO_API}/${data.substring(0, 4)}/${data.substring(5, 7)}`,
        { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
    }

  }

}
