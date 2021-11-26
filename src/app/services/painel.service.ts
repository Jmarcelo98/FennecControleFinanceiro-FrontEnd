import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PainelDespesa } from '../models/painelDespesa';
import { PainelReceita } from '../models/painelReceita';
import { PainelValoresFinaisAnuais } from '../models/painelValoresFinaisAnuais';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/painel`

  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  anosDashboard() {
    return this.httpClient.get<string[]>(this.CAMINHO_API,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  listaValoresReceitaPorAno(ano: string) {
    return this.httpClient.get<PainelReceita[]>(`${this.CAMINHO_API}/receita/${ano}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  listaValoresDespesaPorAno(ano: string) {
    return this.httpClient.get<PainelDespesa[]>(`${this.CAMINHO_API}/despesa/${ano}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  valoresFinaisAnuais(ano: string) {
    return this.httpClient.get<PainelValoresFinaisAnuais>(`${this.CAMINHO_API}/valoresAnual/${ano}`,
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

}
