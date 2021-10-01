import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth/login`
  nameToken: string = "jwttoken"
  usuario: Usuario

  constructor(private httpClient: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  public estaAutenticado(): boolean {
    const token = localStorage.getItem(this.nameToken);
    return !this.jwtHelper.isTokenExpired(token || undefined);
  }

  login(usuario: string, senha: string) {
    return this.httpClient.post<Login>(this.CAMINHO_API, { usuario, senha })
  }

  setToken(token: string) {
    localStorage.setItem(this.nameToken, token);
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('user') || '');
    return this.usuario;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem(this.nameToken)
    this.router.navigate(['login']);
  }

}
