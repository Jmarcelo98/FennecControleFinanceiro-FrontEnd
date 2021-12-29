import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AutenticacaoService } from './autenticacao.service';
import { TipoReceita } from 'src/app/models/tipoReceita';

@Injectable({
  providedIn: 'root'
})
export class TipoReceitaService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/tipoReceita`
  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  buscarTiposDeReceitas() {
    return this.httpClient.get<TipoReceita[]>(this.CAMINHO_API,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.getToken() }) })
  }

}
