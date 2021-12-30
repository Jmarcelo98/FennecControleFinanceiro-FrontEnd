import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AutenticacaoService } from './autenticacao.service';
import { Categorias } from '../models/categorias';

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

}