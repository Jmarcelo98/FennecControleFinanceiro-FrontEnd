import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/auth`

  emailFoiDigitado: boolean

  codigoDigitado: boolean

  constructor(private httpClient: HttpClient) { }

  public getEmailDigitado(): boolean {
    return this.emailFoiDigitado;
  }

  setEmailDigitado(enviado: boolean) {
    this.emailFoiDigitado = enviado
  }

  public getCodigoDigitado(): boolean {
    return this.codigoDigitado;
  }

  setCodigoDigitado(enviado: boolean) {
    this.codigoDigitado = enviado
  }

  enviarCodigo(email: string, codigo: string) {
    return this.httpClient.get<boolean>(`${this.CAMINHO_API}/${email}/${codigo}`)
  }

  esqueciASenha(email: string): Observable<string> {
    return this.httpClient.post<string>(`${this.CAMINHO_API}/recuperar-senha`, { email })
  }

}
