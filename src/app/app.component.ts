import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor(public router: Router, private autenticacao: AutenticacaoService) { }

  title = 'Fennec Controle Financeiro';

  isLogado?: boolean = false

  ngOnInit() {

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
