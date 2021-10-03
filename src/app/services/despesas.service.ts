import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Despesa } from '../models/despesa';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/despesa`

  headersToken = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  .append('Authorization', 'Bearer ' + this.auth.getToken())
  .append('Accept', 'application/json');

  constructor(private httpClient: HttpClient, public auth: AutenticacaoService) { }

  valorDespesaMesAtual() {
    return this.httpClient.get<number>(`${this.CAMINHO_API}/valorDespesaMes`, {headers: this.headersToken});
  }

}
