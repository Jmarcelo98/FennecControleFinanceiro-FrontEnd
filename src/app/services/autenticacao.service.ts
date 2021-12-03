import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth`
  nameToken: string = "jwttoken"
  nome: string = "nome";
  sobrenome: string = "sobrenome";
  usuario: Usuario

  constructor(private httpClient: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  public estaAutenticado(): boolean {
    const token = localStorage.getItem(this.nameToken);
    return !this.jwtHelper.isTokenExpired(token || undefined);
  }

  atualizarSenha(email: string, senha: string): Observable<string> {
    return this.httpClient.put<string>(`${this.CAMINHO_API}/atualizarSenha`, { email, senha });
  }

  login(email: string, senha: string) {
    return this.httpClient.post<Login>(`${this.CAMINHO_API}/login`, { email, senha })
  }

  setToken(token: string) {
    localStorage.setItem(this.nameToken, token);
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem(this.nome, JSON.stringify(usuario.nome));
    localStorage.setItem(this.sobrenome, JSON.stringify(usuario.sobrenome));
  }

  getNomeUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem(this.nome) || '');
    return this.usuario;
  }


  getSobreNomeUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem(this.sobrenome) || '');
    return this.usuario;
  }

  getToken(): string {
    return localStorage.getItem(this.nameToken) || '';
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem(this.nameToken);
    localStorage.removeItem(this.nome);
    localStorage.removeItem(this.sobrenome);
    this.router.navigate(['login']);
  }

}
