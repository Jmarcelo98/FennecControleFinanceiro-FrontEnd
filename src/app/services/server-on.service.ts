import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerOnService {

  private readonly CAMINHO_API = `${environment.CAMINHO_RAIZ}/status`

  constructor(private httpClient: HttpClient) { }

  verificarStatus() {
    return this.httpClient.get<boolean>(`${this.CAMINHO_API}`)
  } 

}
