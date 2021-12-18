import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Despesa } from '../models/despesa';
import { DespesasEQuantidadeMensal } from '../models/despesasEQuantidadeMensal';
import { ControlesDeDatas } from '../models/limiteDeDatas';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/despesa`

  valorDespesa: number;

  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }


  // valorDespesaMesAtual() {
  //   return this.httpClient.get<number>(`${this.CAMINHO_API}/valorDespesaMes`,
  //     { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  // }

  buscarDataMaisRecenteDaDespesa() {
    return this.httpClient.get<ControlesDeDatas>(`${this.CAMINHO_API}/dataMaisRecente`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  valorTotalDaDespesaMesAnoPesquisado(dataRecebida: string) {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valor-total/mensal-anual`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }), params: { data: dataRecebida } });
  }

  deletarDespesa(id: number) {
    return this.httpClient.delete<string>(`${this.CAMINHO_API}/${id}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  atualizarDespesa(despesa: Despesa) {
    return this.httpClient.put(`${this.CAMINHO_API}`, despesa,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }


  quantidadeDespesaMensal(dataRecebida: string) {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/quantidade-mensal`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }), params: { data: dataRecebida } });
  }

  adicionarNovaDespesa(despesa: Despesa) {
    return this.httpClient.post(`${this.CAMINHO_API}`, despesa,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }


  buscarTodasDespesasOuDeAcordoComOMesAno(dataRecebida: string, paginacao: number) {
    return this.httpClient.get<DespesasEQuantidadeMensal>(`${this.CAMINHO_API}/data/mensal-anual`,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }),
        params: { data: dataRecebida, pagina: paginacao - 1, linhasPorPagina: 5 }
      });
  }


}
