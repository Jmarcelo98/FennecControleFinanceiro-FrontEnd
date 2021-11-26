import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PainelReceita } from '../models/painelReceita';
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

  valoresReceitaPorAno(ano: string) {
    return this.httpClient.get<PainelReceita[]>(`${this.CAMINHO_API}/${ano}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

}
