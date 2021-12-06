import { Component, HostListener, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService) { }

  logado: boolean

  container = "container"

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
