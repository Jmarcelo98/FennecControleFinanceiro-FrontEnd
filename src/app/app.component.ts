import { Component, HostListener, OnInit } from '@angular/core';
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

  container = "container"

  serverOn: boolean

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   const a = event.target.innerWidth;  
  //   if (a == 991) {
  //     this.container = "container-fluid"
  //   } else {
  //     this.container = "container"
  //   }
  // }

  async ngOnInit() {

    // if (window.screen.width <= 991) {
    //   this.container = "container-fluid"
    // } else {
    //   this.container = "container"
    // }

    await this.serverOnService.verificarStatus().toPromise().then(
      responseServer => this.serverOn = responseServer
    ).catch(err => {
      if (err.status == 0) {
        this.serverOn = false;
      }
    })

    if (!this.serverOn) {
      setTimeout(() => {
        window.location.reload()
      }, 10000)
    }

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
