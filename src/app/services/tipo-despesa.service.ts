import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categorias } from '../models/categorias';
import { ListCategoriasDespesas } from '../models/tipoDespesa';
import { ListCategorias } from '../models/tipoReceita';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDespesaService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/tipo-despesa`
  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  buscarTiposDeDespesas() {
    return this.httpClient.get<Categorias[]>(this.CAMINHO_API,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  tipoDespesasPaginacao(paginacao: number) {
    return this.httpClient.get<ListCategoriasDespesas>(`${this.CAMINHO_API}/paginacao`,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }),
        params: { pagina: paginacao - 1, linhasPorPagina: 5 }
      });
  }

  deletarTipoDespesa(id: number) {
    return this.httpClient.delete<string>(`${this.CAMINHO_API}/${id}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  atualizarTipoDespesa(tipoDespesa: Categorias) {
    return this.httpClient.put(`${this.CAMINHO_API}`, tipoDespesa,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

}
