import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AutenticacaoService } from './autenticacao.service';
import { Categorias } from '../models/categorias';
import { ListCategorias } from '../models/tipoReceita';

@Injectable({
  providedIn: 'root'
})
export class TipoReceitaService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/tipo-receita`
  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  buscarTiposDeReceitas() {
    return this.httpClient.get<Categorias[]>(this.CAMINHO_API,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

  tipoReceitasPaginacao(paginacao: number) {
    return this.httpClient.get<ListCategorias>(`${this.CAMINHO_API}/paginacao`,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }),
        params: { pagina: paginacao - 1, linhasPorPagina: 5 }
      });
  }

  deletarTipoReceita(id: number) {
    return this.httpClient.delete<string>(`${this.CAMINHO_API}/${id}`, 
    { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

}
