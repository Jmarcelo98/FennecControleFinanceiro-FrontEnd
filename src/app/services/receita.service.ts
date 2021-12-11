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

  // valorReceitaDataAtual() {
  //   return this.httpClient.get<number>(`${this.CAMINHO_API}/valorReceitaMes`,
  //     { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  // }

  buscarDataMaisRecenteDaReceita() {
    return this.httpClient.get<Date>(`${this.CAMINHO_API}/dataMaisRecente`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  valorTotalDaReceitaMesAnoPesquisado(dataRecebida: string) {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valor-total/mensal-anual`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }), params: { data: dataRecebida } });
  }

  deletarReceita(id: number) {
    return this.httpClient.delete<string>(`${this.CAMINHO_API}/${id}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  atualizarReceita(receita: Receita) {
    return this.httpClient.put(`${this.CAMINHO_API}`, receita,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  quantidadeReceitaMensal(dataRecebida: string) {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/quantidade-mensal`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }), params: { data: dataRecebida } });
  }

  adicionarNovaReceita(receita: Receita) {
    return this.httpClient.post(`${this.CAMINHO_API}`, receita,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  buscarTodasReceitasOuDeAcordoComOMesAno(dataRecebida: string, paginacao: number) {
    return this.httpClient.get<Receita[]>(`${this.CAMINHO_API}/data/mensal-anual`,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }),
        params: { data: dataRecebida, pagina: paginacao - 1, linhasPorPagina: 5 }
      });
  }

}
