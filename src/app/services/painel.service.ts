import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Painel } from '../models/painel';
// import { PainelDespesa } from '../models/painelGraficoDespesa';
// import { PainelReceita } from '../models/painelGraficoReceita';
// import { PainelValoresFinaisAnuais } from '../models/painelValoresFinaisAnuais';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/painel`

  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  anosEmQuePossuiReceitaOuDespesa() {
    return this.httpClient.get<string[]>(`${this.CAMINHO_API}/anos`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) });
  }

  painelDeAcordoComAno(ano: string) {
    return this.httpClient.get<Painel>(`${this.CAMINHO_API}/ano`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }), params: {ano: ano} });
  }

}
