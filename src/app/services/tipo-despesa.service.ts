import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categorias } from '../models/categorias';
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
}
