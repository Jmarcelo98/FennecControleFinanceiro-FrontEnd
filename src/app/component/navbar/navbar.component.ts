import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  logado: boolean

  container = "container"

  activeIni = ""
  activeRec = ""
  activeDes = ""

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const a = event.target.innerWidth;
    if (a >= 565) {
      this.container = "container-fluid"
    } else {
      this.container = "container"
    }
  }

  ngOnInit(): void {

    if (this.router.url == "/") {
      this.activeIni = "active"
    } else if (this.router.url == "/nova-receita") {
      this.activeRec = "active"
    } else if (this.router.url == "/nova-despesa"){
      this.activeDes = "active"
    }

    if (window.screen.width >= 565) {
      this.container = "container-fluid"
    } else {
      this.container = "container"
    }

    if (!this.autenticacaoService.estaAutenticado()) {
      this.logado = false
    } else {
      this.logado = true
    }

  }

  deslogar() {
    this.autenticacaoService.logout()
  }

}
