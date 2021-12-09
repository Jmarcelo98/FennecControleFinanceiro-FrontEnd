import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth/cadastrar`
  constructor(private httpClient: HttpClient) { }

  cadastrar(email: string, senha: string, nome: string, sobrenome: string) {
    return this.httpClient.post<Login>(this.CAMINHO_API, {email, senha, nome, sobrenome})
  }
  
}
