import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  visualizarSenha = false

  constructor(private autenticacao: AutenticacaoService, private router: Router) { }



  ngOnInit(): void {

    if (this.autenticacao.estaAutenticado()) {

      this.router.navigate(['']);

    }

  }

  mostrarSenha() {
    this.visualizarSenha = !this.visualizarSenha;
  }

}
