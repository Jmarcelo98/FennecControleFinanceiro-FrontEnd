import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeUsuario: Usuario
  sobrenomeUsuario: Usuario


  constructor(private autenticao: AutenticacaoService) { }

  ngOnInit(): void {

    if (this.autenticao.estaAutenticado()) {

      this.nomeUsuario = this.autenticao.getNomeUsuario()
      this.sobrenomeUsuario = this.autenticao.getSobreNomeUsuario();
     
    }

  }

}