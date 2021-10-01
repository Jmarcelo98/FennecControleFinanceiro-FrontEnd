import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth/login`
  nameToken: string = "jwttoken"

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(usuario: string, senha: string) {
    return this.httpClient.post<Login>(this.CAMINHO_API, { usuario, senha })
  }

  setToken(token: string) {
    localStorage.setItem(this.nameToken, token);
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  logout() {
    //localStorage.getItem(this.nameToken);
    localStorage.removeItem('user');
    localStorage.removeItem(this.nameToken)
    this.router.navigate(['login']);
  }

}
