import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/usuario`

  emailFoiDigitado: boolean

  codigoDigitado: boolean

  constructor(private httpClient: HttpClient) { }

  public getEmailDigitado(): boolean {
    return this.emailFoiDigitado;
  }

  atualizarSenha(email: string, senha: string): Observable<string> {
    return this.httpClient.put<string>(`${this.CAMINHO_API}/nova-senha`, { email, senha });
  }

  verificarCodigoEnviado(email: string, codigo: string) {
    return this.httpClient.get<boolean>(`${this.CAMINHO_API}/verificarCodigo`, {params: {email: email, codigo: codigo} } );
  }

  enviarCodigoEmail(email: string): Observable<string> {
    return this.httpClient.post<string>(`${this.CAMINHO_API}/enviar-codigo-email`, { email })
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

}
