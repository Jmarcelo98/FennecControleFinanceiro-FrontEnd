import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth/cadastro`

  constructor(private httpClient: HttpClient) { }

  cadastrar(usuario: string, senha: string) {
    return this.httpClient.post<Login>(this.CAMINHO_API, {usuario, senha})
  }
  
}
