import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth`

  constructor(private httpClient: HttpClient) { }

  enviarCodigo(email: string, codigo: string) {
    return this.httpClient.get<boolean>(`${this.CAMINHO_API}/${email}/${codigo}`)
  }

  esqueciASenha(email: string): Observable<string> {
    var headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.post<string>(`${this.CAMINHO_API}/recuperar-senha`, {email})
  }

}
