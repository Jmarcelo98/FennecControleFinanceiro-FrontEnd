import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao.service';
import { ServerOnService } from './services/server-on.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor(public router: Router, private autenticacao: AutenticacaoService, private serverOnService: ServerOnService) { }

  title = 'Fennec Controle Financeiro';

  isLogado?: boolean = false

  serverOn: boolean

  async ngOnInit() {

    await this.serverOnService.verificarStatus().toPromise().then(
      responseServer => this.serverOn = responseServer
    ).catch(err => {
      if (err.status == 0) {
        console.log(err);
        
        this.serverOn = false;
      }
    })

    if (localStorage.getItem != null) {
      this.isLogado = true
    } else {
      this.isLogado = false
    }

  }

  logout() {
    this.autenticacao.logout();
  }

}
